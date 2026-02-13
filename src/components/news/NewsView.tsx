import { useState, useEffect, useCallback } from 'react';
import { Newspaper, RefreshCw, ExternalLink, Clock, AlertCircle, Rss } from 'lucide-react';
import { Card } from '@/components/shared/Card.tsx';
import { cn } from '@/lib/utils.ts';

// ===== TYPES =====

interface NewsSource {
  id: string;
  name: string;
  feedUrl: string;
  website: string;
  emoji: string;
}

interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: Date;
  sourceId: string;
  sourceName: string;
  sourceEmoji: string;
  description: string;
}

interface CachedNews {
  items: Array<Omit<NewsItem, 'pubDate'> & { pubDate: string }>;
  fetchedAt: number;
  failedSources: string[];
}

// ===== SOURCES =====

const NEWS_SOURCES: NewsSource[] = [
  { id: 'thehackernews', name: 'The Hacker News', feedUrl: 'https://feeds.feedburner.com/TheHackersNews', website: 'https://thehackernews.com', emoji: '🔴' },
  { id: 'bleeping', name: 'BleepingComputer', feedUrl: 'https://www.bleepingcomputer.com/feed/', website: 'https://www.bleepingcomputer.com', emoji: '💻' },
  { id: 'krebs', name: 'Krebs on Security', feedUrl: 'https://krebsonsecurity.com/feed/', website: 'https://krebsonsecurity.com', emoji: '🛡️' },
  { id: 'heise', name: 'Heise Security', feedUrl: 'https://www.heise.de/security/rss/alert-news-atom.xml', website: 'https://www.heise.de/security', emoji: '🇩🇪' },
  { id: 'securityweek', name: 'SecurityWeek', feedUrl: 'https://www.securityweek.com/feed/', website: 'https://www.securityweek.com', emoji: '📰' },
  { id: 'darkreading', name: 'Dark Reading', feedUrl: 'https://www.darkreading.com/rss.xml', website: 'https://www.darkreading.com', emoji: '🌑' },
];

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const CACHE_KEY = 'sovereign-news-cache';
const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 Stunden

// ===== HELPERS =====

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseRSSFeed(xml: string, source: NewsSource): NewsItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');

  // Check for parse error
  if (doc.querySelector('parsererror')) return [];

  const items: NewsItem[] = [];

  // RSS 2.0 format
  const rssItems = doc.querySelectorAll('item');
  if (rssItems.length > 0) {
    rssItems.forEach((item, i) => {
      if (i >= 20) return;
      const title = item.querySelector('title')?.textContent?.trim() || '';
      const link = item.querySelector('link')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
      const desc = item.querySelector('description')?.textContent?.trim() || '';
      if (title && link) {
        items.push({
          id: `${source.id}-${i}`,
          title,
          link,
          pubDate: pubDate ? new Date(pubDate) : new Date(),
          sourceId: source.id,
          sourceName: source.name,
          sourceEmoji: source.emoji,
          description: stripHtml(desc).slice(0, 280),
        });
      }
    });
    return items;
  }

  // Atom format (Heise etc.)
  const entries = doc.querySelectorAll('entry');
  entries.forEach((entry, i) => {
    if (i >= 20) return;
    const title = entry.querySelector('title')?.textContent?.trim() || '';
    const linkEl = entry.querySelector('link[href]');
    const link = linkEl?.getAttribute('href') || '';
    const updated =
      entry.querySelector('updated')?.textContent?.trim() ||
      entry.querySelector('published')?.textContent?.trim() || '';
    const summary =
      entry.querySelector('summary')?.textContent?.trim() ||
      entry.querySelector('content')?.textContent?.trim() || '';
    if (title && link) {
      items.push({
        id: `${source.id}-${i}`,
        title,
        link,
        pubDate: updated ? new Date(updated) : new Date(),
        sourceId: source.id,
        sourceName: source.name,
        sourceEmoji: source.emoji,
        description: stripHtml(summary).slice(0, 280),
      });
    }
  });
  return items;
}

function relativeTimeDE(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Gerade eben';
  if (diffMin < 60) return `vor ${diffMin} Min.`;
  if (diffH < 24) return `vor ${diffH} Std.`;
  if (diffD === 1) return 'Gestern';
  if (diffD < 7) return `vor ${diffD} Tagen`;
  if (diffD < 30) return `vor ${Math.floor(diffD / 7)} Wo.`;
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ===== COMPONENT =====

export function NewsView() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchNews = useCallback(async (force = false) => {
    // Check cache
    if (!force) {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const data: CachedNews = JSON.parse(raw);
          if (Date.now() - data.fetchedAt < CACHE_TTL) {
            setNews(data.items.map((i) => ({ ...i, pubDate: new Date(i.pubDate) })));
            setFailedSources(data.failedSources);
            setLastFetched(new Date(data.fetchedAt));
            setLoading(false);
            return;
          }
        }
      } catch { /* ignore */ }
    }

    setLoading(true);
    setError(null);

    const allItems: NewsItem[] = [];
    const failed: string[] = [];

    const results = await Promise.allSettled(
      NEWS_SOURCES.map(async (source) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        try {
          const res = await fetch(CORS_PROXY + encodeURIComponent(source.feedUrl), {
            signal: controller.signal,
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const xml = await res.text();
          return parseRSSFeed(xml, source);
        } finally {
          clearTimeout(timeout);
        }
      })
    );

    results.forEach((result, i) => {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        allItems.push(...result.value);
      } else {
        failed.push(NEWS_SOURCES[i].name);
      }
    });

    allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

    if (allItems.length === 0) {
      setError('Keine Feeds erreichbar. Prüfe deine Internetverbindung oder versuche es später erneut.');
    }

    setNews(allItems);
    setFailedSources(failed);
    const now = new Date();
    setLastFetched(now);
    setLoading(false);

    // Cache results
    try {
      const cache: CachedNews = {
        items: allItems.map((i) => ({ ...i, pubDate: i.pubDate.toISOString() })),
        fetchedAt: now.getTime(),
        failedSources: failed,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch { /* quota exceeded etc */ }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const filtered = activeFilter ? news.filter((n) => n.sourceId === activeFilter) : news;
  const activeSources = NEWS_SOURCES.filter((s) => !failedSources.includes(s.name));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Newspaper size={28} className="text-accent" />
            Cyber News
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {news.length} Artikel aus {activeSources.length} Quellen
            {lastFetched && <> · Aktualisiert {relativeTimeDE(lastFetched)}</>}
          </p>
        </div>
        <button
          onClick={() => fetchNews(true)}
          disabled={loading}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0',
            'bg-accent/10 text-accent hover:bg-accent/20',
            loading && 'opacity-50 cursor-not-allowed'
          )}
        >
          <RefreshCw size={16} className={cn(loading && 'animate-spin')} />
          <span className="hidden sm:inline">Aktualisieren</span>
        </button>
      </div>

      {/* Source filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border',
            !activeFilter
              ? 'bg-accent text-white border-accent'
              : 'bg-bg-card text-text-muted border-border hover:text-text'
          )}
        >
          Alle ({news.length})
        </button>
        {activeSources.map((source) => {
          const count = news.filter((n) => n.sourceId === source.id).length;
          return (
            <button
              key={source.id}
              onClick={() => setActiveFilter(activeFilter === source.id ? null : source.id)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border',
                activeFilter === source.id
                  ? 'bg-accent text-white border-accent'
                  : 'bg-bg-card text-text-muted border-border hover:text-text'
              )}
            >
              {source.emoji} {source.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Failed sources warning */}
      {failedSources.length > 0 && !error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 text-yellow-400 text-xs">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>Nicht erreichbar: {failedSources.join(', ')}</span>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <RefreshCw size={32} className="animate-spin text-accent" />
          <p className="text-text-muted text-sm">Feeds werden geladen...</p>
        </div>
      )}

      {/* Error state with direct links */}
      {error && !loading && (
        <Card className="p-8 text-center">
          <AlertCircle size={32} className="mx-auto text-red-400 mb-3" />
          <p className="text-text-muted mb-4">{error}</p>
          <p className="text-xs text-text-muted mb-3">Direkt zu den Quellen:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {NEWS_SOURCES.map((s) => (
              <a
                key={s.id}
                href={s.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-accent text-sm hover:underline"
              >
                {s.emoji} {s.name} <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </Card>
      )}

      {/* News list */}
      {!loading && !error && (
        <div className="space-y-3">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card className="p-4 hover:border-accent/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 shrink-0">{item.sourceEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-text-muted">{item.sourceName}</span>
                      <span className="text-xs text-text-muted">·</span>
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Clock size={10} />
                        {relativeTimeDE(item.pubDate)}
                      </span>
                    </div>
                    <h3 className="font-medium text-sm group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-text-muted mt-1.5 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-text-muted group-hover:text-accent transition-colors mt-1 shrink-0"
                  />
                </div>
              </Card>
            </a>
          ))}
        </div>
      )}

      {/* Empty filter state */}
      {!loading && !error && filtered.length === 0 && news.length > 0 && (
        <Card className="p-8 text-center">
          <Rss size={32} className="mx-auto text-text-muted mb-3" />
          <p className="text-text-muted text-sm">Keine Artikel für diesen Filter.</p>
        </Card>
      )}

      {/* Sources footer */}
      <Card className="p-4">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          Quellen
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {NEWS_SOURCES.map((s) => (
            <a
              key={s.id}
              href={s.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-text-muted hover:text-accent transition-colors"
            >
              <span>{s.emoji}</span>
              <span>{s.name}</span>
              <ExternalLink size={10} />
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
