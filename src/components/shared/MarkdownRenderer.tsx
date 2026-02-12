import type { ReactNode } from 'react';

interface MarkdownRendererProps {
  content: string;
  onWikiLink?: (title: string) => void;
  resolveWikiLink?: (title: string) => boolean;
}

interface ParsedToken {
  type: 'heading' | 'code_block' | 'hr' | 'ol_item' | 'ul_item' | 'paragraph';
  level?: number;
  lang?: string;
  raw: string;
}

function tokenize(content: string): ParsedToken[] {
  const lines = content.split('\n');
  const tokens: ParsedToken[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trimStart().startsWith('```')) {
      const lang = line.trimStart().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      tokens.push({ type: 'code_block', lang, raw: codeLines.join('\n') });
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      tokens.push({ type: 'hr', raw: line });
      i++;
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      tokens.push({ type: 'heading', level: headingMatch[1].length, raw: headingMatch[2] });
      i++;
      continue;
    }

    // Ordered list item
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      tokens.push({ type: 'ol_item', raw: olMatch[1] });
      i++;
      continue;
    }

    // Unordered list item
    const ulMatch = line.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      tokens.push({ type: 'ul_item', raw: ulMatch[1] });
      i++;
      continue;
    }

    // Empty line → skip
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph (collect consecutive non-empty lines)
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trimStart().startsWith('```') &&
      !lines[i].match(/^#{1,3}\s/) &&
      !lines[i].match(/^[-*]\s/) &&
      !lines[i].match(/^\d+\.\s/) &&
      !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    tokens.push({ type: 'paragraph', raw: paraLines.join(' ') });
  }

  return tokens;
}

function renderInline(
  text: string,
  onWikiLink?: (title: string) => void,
  resolveWikiLink?: (title: string) => boolean,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Pattern: **bold**, *italic*, `code`, [text](url), [[wiki link]]
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\[\[([^\]]+)\]\])/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // **bold**
      nodes.push(<strong key={key++} className="font-bold">{match[2]}</strong>);
    } else if (match[3]) {
      // *italic*
      nodes.push(<em key={key++} className="italic">{match[3]}</em>);
    } else if (match[4]) {
      // `code`
      nodes.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-bg-hover text-accent text-sm font-mono">
          {match[4]}
        </code>
      );
    } else if (match[5] && match[6]) {
      // [text](url)
      nodes.push(
        <a key={key++} href={match[6]} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">
          {match[5]}
        </a>
      );
    } else if (match[7]) {
      // [[wiki link]]
      const title = match[7];
      const exists = resolveWikiLink ? resolveWikiLink(title) : false;
      nodes.push(
        <button
          key={key++}
          onClick={() => onWikiLink?.(title)}
          className={`font-medium underline decoration-dotted ${exists ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}`}
        >
          {title}
        </button>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function MarkdownRenderer({ content, onWikiLink, resolveWikiLink }: MarkdownRendererProps) {
  const tokens = tokenize(content);
  const elements: ReactNode[] = [];
  let listBuffer: { type: 'ul' | 'ol'; items: ReactNode[] } | null = null;
  let key = 0;

  function flushList() {
    if (!listBuffer) return;
    if (listBuffer.type === 'ul') {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 text-text-muted">
          {listBuffer.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    } else {
      elements.push(
        <ol key={key++} className="list-decimal list-inside space-y-1 text-text-muted">
          {listBuffer.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );
    }
    listBuffer = null;
  }

  for (const token of tokens) {
    if (token.type === 'ul_item') {
      if (!listBuffer || listBuffer.type !== 'ul') {
        flushList();
        listBuffer = { type: 'ul', items: [] };
      }
      listBuffer.items.push(renderInline(token.raw, onWikiLink, resolveWikiLink));
      continue;
    }
    if (token.type === 'ol_item') {
      if (!listBuffer || listBuffer.type !== 'ol') {
        flushList();
        listBuffer = { type: 'ol', items: [] };
      }
      listBuffer.items.push(renderInline(token.raw, onWikiLink, resolveWikiLink));
      continue;
    }

    flushList();

    switch (token.type) {
      case 'heading':
        if (token.level === 1) {
          elements.push(<h1 key={key++} className="text-xl font-bold mt-4 mb-2">{renderInline(token.raw, onWikiLink, resolveWikiLink)}</h1>);
        } else if (token.level === 2) {
          elements.push(<h2 key={key++} className="text-lg font-bold mt-3 mb-1.5">{renderInline(token.raw, onWikiLink, resolveWikiLink)}</h2>);
        } else {
          elements.push(<h3 key={key++} className="text-base font-semibold mt-2 mb-1">{renderInline(token.raw, onWikiLink, resolveWikiLink)}</h3>);
        }
        break;
      case 'code_block':
        elements.push(
          <pre key={key++} className="bg-bg-hover rounded-lg p-4 overflow-x-auto text-sm font-mono my-2">
            <code>{token.raw}</code>
          </pre>
        );
        break;
      case 'hr':
        elements.push(<hr key={key++} className="border-border my-4" />);
        break;
      case 'paragraph':
        elements.push(
          <p key={key++} className="text-text-muted leading-relaxed">
            {renderInline(token.raw, onWikiLink, resolveWikiLink)}
          </p>
        );
        break;
    }
  }

  flushList();

  return <div className="space-y-2">{elements}</div>;
}
