import type { DailyPlanConfig, GeneratedBlock, PersonalBlock } from '@/types/index.ts';

// ===== HELPERS =====

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

interface FreeSlot {
  start: number; // minutes
  end: number;
}

interface PlacedBlock {
  start: number;
  end: number;
  label: string;
  type: 'personal' | 'break';
  color?: string;
}

// Curriculum learning block definitions (from dailySchedule, only work blocks)
const LEARNING_BLOCKS = [
  { label: 'DEEP TECHNICAL', durationMinutes: 120, index: 0 },
  { label: 'OSINT / INVESTIGATION', durationMinutes: 90, index: 2 },
  { label: 'NEWS', durationMinutes: 30, index: 3 },
  { label: 'CHALLENGES', durationMinutes: 60, index: 4 },
  { label: 'DEEP LEARNING', durationMinutes: 90, index: 9 },
  { label: 'PROJEKT-ZEIT', durationMinutes: 90, index: 11 },
];

const TOTAL_LEARNING_MINUTES = LEARNING_BLOCKS.reduce((sum, b) => sum + b.durationMinutes, 0);
const MIN_BLOCK_DURATION = 30;

export function getAvailableSlots(
  dayStart: number,
  dayEnd: number,
  placedBlocks: PlacedBlock[]
): FreeSlot[] {
  // Sort placed blocks by start time
  const sorted = [...placedBlocks].sort((a, b) => a.start - b.start);
  const slots: FreeSlot[] = [];
  let cursor = dayStart;

  for (const block of sorted) {
    if (block.start > cursor) {
      slots.push({ start: cursor, end: block.start });
    }
    cursor = Math.max(cursor, block.end);
  }

  if (cursor < dayEnd) {
    slots.push({ start: cursor, end: dayEnd });
  }

  return slots;
}

function fitLearningBlocks(
  freeSlots: FreeSlot[],
  totalAvailableMinutes: number
): GeneratedBlock[] {
  const results: GeneratedBlock[] = [];

  // Calculate scale factor if less time available than default
  const scaleFactor = Math.min(1, totalAvailableMinutes / TOTAL_LEARNING_MINUTES);

  // Scale each learning block proportionally
  const scaledBlocks = LEARNING_BLOCKS.map(b => ({
    ...b,
    scaledDuration: Math.max(MIN_BLOCK_DURATION, Math.round(b.durationMinutes * scaleFactor)),
  })).filter(b => b.scaledDuration >= MIN_BLOCK_DURATION);

  let slotIndex = 0;
  let slotCursor = freeSlots[0]?.start ?? 0;

  for (const block of scaledBlocks) {
    if (slotIndex >= freeSlots.length) break;

    let remaining = block.scaledDuration;

    while (remaining > 0 && slotIndex < freeSlots.length) {
      const slot = freeSlots[slotIndex];
      const availableInSlot = slot.end - slotCursor;

      if (availableInSlot <= 0) {
        slotIndex++;
        if (slotIndex < freeSlots.length) {
          slotCursor = freeSlots[slotIndex].start;
        }
        continue;
      }

      const take = Math.min(remaining, availableInSlot);
      if (take >= MIN_BLOCK_DURATION || remaining <= availableInSlot) {
        results.push({
          id: `learn_${block.index}_${slotCursor}`,
          startTime: minutesToTime(slotCursor),
          endTime: minutesToTime(slotCursor + take),
          label: block.label,
          type: 'learning',
          curriculumBlockIndex: block.index,
          durationMinutes: take,
        });
        slotCursor += take;
        remaining = 0;
      } else {
        // Remaining slot too small for meaningful work, skip to next slot
        slotIndex++;
        if (slotIndex < freeSlots.length) {
          slotCursor = freeSlots[slotIndex].start;
        }
      }
    }
  }

  return results;
}

export function generateDailySchedule(
  config: DailyPlanConfig,
  _curriculumBlocks: { time: string; block: string }[]
): GeneratedBlock[] {
  const dayStart = timeToMinutes(config.wakeUpTime);
  const dayEnd = timeToMinutes(config.bedTime);

  if (dayEnd <= dayStart) return [];

  const placedBlocks: PlacedBlock[] = [];

  // 1. Place personal blocks first (fixed times, non-movable)
  for (const pb of config.personalBlocks) {
    const start = timeToMinutes(pb.startTime);
    const end = timeToMinutes(pb.endTime);
    if (start >= dayStart && end <= dayEnd && end > start) {
      placedBlocks.push({
        start,
        end,
        label: pb.label,
        type: 'personal',
        color: pb.color,
      });
    }
  }

  // 2. Auto-insert break blocks
  // Breakfast: 30min after waking up
  const breakfastStart = dayStart + 0; // Immediate first slot is learning, breakfast after first block
  const firstLearningEnd = dayStart + 120; // After ~2h learning
  const breakfastActualStart = Math.min(firstLearningEnd, dayStart + 120);
  if (breakfastActualStart + 30 <= dayEnd) {
    placedBlocks.push({
      start: breakfastActualStart,
      end: breakfastActualStart + 30,
      label: 'Frühstück',
      type: 'break',
    });
  }

  // Lunch: 60min around 12:00-13:00
  const lunchStart = timeToMinutes('12:00');
  if (lunchStart >= dayStart && lunchStart + 60 <= dayEnd) {
    placedBlocks.push({
      start: lunchStart,
      end: lunchStart + 60,
      label: 'Mittagspause',
      type: 'break',
    });
  }

  // Dinner: 30min around 18:00-18:30
  const dinnerStart = timeToMinutes('18:00');
  if (dinnerStart >= dayStart && dinnerStart + 30 <= dayEnd) {
    placedBlocks.push({
      start: dinnerStart,
      end: dinnerStart + 30,
      label: 'Abendessen',
      type: 'break',
    });
  }

  // 3. Resolve overlaps: personal blocks take priority over breaks
  const resolvedBlocks = resolveOverlaps(placedBlocks);

  // 4. Get free slots
  const freeSlots = getAvailableSlots(dayStart, dayEnd, resolvedBlocks);
  const totalFreeMinutes = freeSlots.reduce((sum, s) => sum + (s.end - s.start), 0);

  // 5. Fit learning blocks into free slots
  const learningBlocks = fitLearningBlocks(freeSlots, totalFreeMinutes);

  // 6. Combine all blocks and sort by start time
  const allBlocks: GeneratedBlock[] = [];

  for (const pb of resolvedBlocks) {
    allBlocks.push({
      id: `${pb.type}_${pb.start}`,
      startTime: minutesToTime(pb.start),
      endTime: minutesToTime(pb.end),
      label: pb.label,
      type: pb.type,
      durationMinutes: pb.end - pb.start,
    });
  }

  allBlocks.push(...learningBlocks);

  // Sort by start time
  allBlocks.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  return allBlocks;
}

function resolveOverlaps(blocks: PlacedBlock[]): PlacedBlock[] {
  // Personal blocks take priority; remove break blocks that overlap with personal
  const personal = blocks.filter(b => b.type === 'personal');
  const breaks = blocks.filter(b => b.type === 'break');

  const resolved: PlacedBlock[] = [...personal];

  for (const brk of breaks) {
    let overlaps = false;
    for (const p of personal) {
      // Check if break overlaps with any personal block
      if (brk.start < p.end && brk.end > p.start) {
        overlaps = true;
        break;
      }
    }
    if (!overlaps) {
      resolved.push(brk);
    }
  }

  return resolved;
}

export function getTotalLearningMinutes(schedule: GeneratedBlock[]): number {
  return schedule
    .filter(b => b.type === 'learning')
    .reduce((sum, b) => sum + b.durationMinutes, 0);
}

export function getDefaultLearningMinutes(): number {
  return TOTAL_LEARNING_MINUTES;
}
