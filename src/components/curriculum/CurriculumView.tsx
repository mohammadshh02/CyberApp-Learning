import { useState } from 'react';
import {
  ChevronRight, ChevronDown, CheckCircle2, Circle, Code, Target,
  BookOpen, Wrench,
} from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store.ts';
import { useAppStore } from '@/stores/app-store.ts';
import { cn, getPhaseColor } from '@/lib/utils.ts';
import { Card } from '@/components/shared/Card.tsx';
import { ProgressBar } from '@/components/shared/ProgressBar.tsx';
import { XpBadge } from '@/components/shared/XpBadge.tsx';
import curriculum from '@/data/curriculum.json';
import { PHASE_DEFINITIONS } from '@/types/index.ts';
import type { TaskType } from '@/types/index.ts';

export function CurriculumView() {
  const { completedTaskIds, completeTask, uncompleteTask } = useProgressStore();
  const { selectedMonth, selectedPhase, setSelectedMonth, setSelectedPhase } = useAppStore();
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<string | null>(null);

  const handleToggle = (taskId: string, type: TaskType) => {
    if (completedTaskIds.has(taskId)) {
      uncompleteTask(taskId);
    } else {
      completeTask(taskId, type);
    }
  };

  // Phase list view
  if (!selectedPhase && !selectedMonth) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl font-bold">OPERATION SOVEREIGN</h2>
        <p className="text-text-muted text-sm">36-Monats Cybersecurity Curriculum — 7 Phasen</p>

        <div className="space-y-3 mt-6">
          {PHASE_DEFINITIONS.map((phase) => {
            const phaseMonths = curriculum.months.filter(m => phase.months.includes(m.id));
            const totalGoals = phaseMonths.flatMap(m => m.goals).length;
            const completed = phaseMonths.flatMap(m => m.goals).filter(g => completedTaskIds.has(g.id)).length;

            return (
              <Card
                key={phase.id}
                hover
                onClick={() => setSelectedPhase(phase.id)}
                className="flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ backgroundColor: phase.color }}
                >
                  {phase.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{phase.name}</h3>
                    <span className="text-xs text-text-muted">{phase.codename}</span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{phase.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <ProgressBar value={completed} max={totalGoals} color={phase.color} size="sm" className="flex-1" />
                    <span className="text-xs text-text-muted">{completed}/{totalGoals}</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-text-muted shrink-0" />
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Phase detail: list months
  if (selectedPhase && !selectedMonth) {
    const phase = PHASE_DEFINITIONS.find(p => p.id === selectedPhase)!;
    const phaseMonths = curriculum.months.filter(m => phase.months.includes(m.id));

    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <button
          onClick={() => setSelectedPhase(null)}
          className="text-sm text-text-muted hover:text-text transition-colors flex items-center gap-1"
        >
          <ChevronRight size={14} className="rotate-180" />
          Zurück zu Phasen
        </button>

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
            style={{ backgroundColor: phase.color }}
          >
            {phase.id}
          </div>
          <div>
            <h2 className="text-xl font-bold">{phase.name}</h2>
            <p className="text-sm text-text-muted">{phase.description}</p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {phaseMonths.map((month) => {
            const completed = month.goals.filter(g => completedTaskIds.has(g.id)).length;
            return (
              <Card
                key={month.id}
                hover
                onClick={() => setSelectedMonth(month.id)}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-bg-hover flex items-center justify-center text-sm font-bold shrink-0">
                  M{month.monthRange}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{month.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <ProgressBar value={completed} max={month.goals.length} color={phase.color} size="sm" className="flex-1" />
                    <span className="text-xs text-text-muted">{completed}/{month.goals.length}</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-text-muted shrink-0" />
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Month detail view
  const month = curriculum.months.find(m => m.id === selectedMonth);
  if (!month) return null;

  const phase = PHASE_DEFINITIONS.find(p => p.months.includes(month.id))!;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => { setSelectedMonth(null); setSelectedPhase(null); }} className="text-text-muted hover:text-text transition-colors">
          Phasen
        </button>
        <ChevronRight size={14} className="text-text-muted" />
        <button onClick={() => setSelectedMonth(null)} className="text-text-muted hover:text-text transition-colors">
          {phase.name}
        </button>
        <ChevronRight size={14} className="text-text-muted" />
        <span className="font-medium">Monat {month.monthRange}</span>
      </div>

      <div>
        <h2 className="text-xl font-bold">{month.title}</h2>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: phase.color + '20', color: phase.color }}>
            {phase.name}
          </span>
          <span className="text-xs text-text-muted">{month.strategy}</span>
        </div>
      </div>

      {/* Goals */}
      <Card>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Target size={16} className="text-accent" />
          Ziele ({month.goals.filter(g => completedTaskIds.has(g.id)).length}/{month.goals.length})
        </h3>
        <div className="space-y-1.5">
          {month.goals.map((goal) => {
            const done = completedTaskIds.has(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => handleToggle(goal.id, 'goal')}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-all hover:bg-bg-hover group',
                  done && 'opacity-60'
                )}
              >
                {done ? (
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
                ) : (
                  <Circle size={18} className="text-text-muted shrink-0 mt-0.5 group-hover:text-accent" />
                )}
                <span className={cn('text-sm flex-1', done && 'line-through')}>{goal.text}</span>
                {done && <XpBadge amount={100} className="shrink-0" />}
              </button>
            );
          })}
        </div>
      </Card>

      {/* KPIs */}
      {month.kpis.length > 0 && (
        <Card>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Target size={16} className="text-warning" />
            KPIs ({month.kpis.filter(k => completedTaskIds.has(k.id)).length}/{month.kpis.length})
          </h3>
          <div className="space-y-1.5">
            {month.kpis.map((kpi) => {
              const done = completedTaskIds.has(kpi.id);
              return (
                <button
                  key={kpi.id}
                  onClick={() => handleToggle(kpi.id, 'kpi')}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all hover:bg-bg-hover group',
                    done && 'opacity-60'
                  )}
                >
                  {done ? (
                    <CheckCircle2 size={18} className="text-success shrink-0" />
                  ) : (
                    <Circle size={18} className="text-text-muted shrink-0 group-hover:text-accent" />
                  )}
                  <span className={cn('text-sm flex-1', done && 'line-through')}>{kpi.name}</span>
                  <span className="text-xs text-text-muted shrink-0">{kpi.target}</span>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* Weeks */}
      {month.weeks.length > 0 && (
        <Card>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <BookOpen size={16} className="text-accent" />
            Wochen-Übersicht
          </h3>
          <div className="space-y-2">
            {month.weeks.map((week) => {
              const isExpanded = expandedWeek === week.id;
              return (
                <div key={week.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedWeek(isExpanded ? null : week.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-bg-hover transition-colors"
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span className="text-sm font-medium flex-1">{week.title}</span>
                    {week.days.length > 0 && (
                      <span className="text-xs text-text-muted">{week.days.length} Tage</span>
                    )}
                    {week.goals.length > 0 && (
                      <span className="text-xs text-text-muted">{week.goals.length} Ziele</span>
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-3 border-t border-border pt-3">
                      {/* Week goals */}
                      {week.goals.length > 0 && (
                        <div className="space-y-1 mb-3">
                          {week.goals.map((goal, i) => (
                            <div key={i} className="text-sm text-text-muted pl-6">
                              - {goal}
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Days */}
                      {week.days.map((day) => (
                        <div key={day.id} className="mb-3">
                          <div className="text-xs font-medium text-accent mb-1">{day.title} (Tag {day.dayNumber})</div>
                          {day.timeBlocks.map((block) => (
                            <div key={block.id} className="pl-4 mb-2">
                              <div className="text-xs text-text-muted font-mono">{block.time} | {block.category}</div>
                              {block.title && <div className="text-sm mt-0.5">{block.title}</div>}
                              {block.tasks.map((task) => (
                                <div key={task.id} className="text-xs text-text-muted pl-2 mt-0.5">- {task.text}</div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Code Blocks */}
      {month.codeBlocks.length > 0 && (
        <Card>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Code size={16} className="text-success" />
            Code-Übungen ({month.codeBlocks.length})
          </h3>
          <div className="space-y-2">
            {month.codeBlocks.map((block) => (
              <div key={block.id} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setShowCode(showCode === block.id ? null : block.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-bg-hover transition-colors"
                >
                  <Code size={14} className="text-success shrink-0" />
                  <span className="text-sm flex-1 truncate">
                    {block.context || `${block.language} Übung`}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-bg-hover text-text-muted">{block.language}</span>
                </button>
                {showCode === block.id && (
                  <pre className="px-4 py-3 bg-bg text-xs overflow-x-auto border-t border-border">
                    <code>{block.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tools */}
      {month.tools.length > 0 && (
        <Card>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Wrench size={16} className="text-text-muted" />
            Tools Setup
          </h3>
          <div className="space-y-1.5">
            {month.tools.map((tool) => {
              const done = completedTaskIds.has(tool.id);
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToggle(tool.id, 'tool_setup')}
                  className={cn(
                    'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-all hover:bg-bg-hover group',
                    done && 'opacity-60'
                  )}
                >
                  {done ? (
                    <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                  ) : (
                    <Circle size={16} className="text-text-muted shrink-0 mt-0.5 group-hover:text-accent" />
                  )}
                  <span className={cn('text-sm', done && 'line-through')}>{tool.name}</span>
                </button>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
