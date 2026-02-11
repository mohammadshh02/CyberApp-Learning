import { create } from 'zustand';
import type { ViewId } from '@/types/index.ts';

interface AppState {
  activeView: ViewId;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  selectedMonth: number | null;
  selectedPhase: number | null;
  setActiveView: (view: ViewId) => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSelectedMonth: (month: number | null) => void;
  setSelectedPhase: (phase: number | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeView: 'dashboard',
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  selectedMonth: null,
  selectedPhase: null,
  setActiveView: (view) => set({ activeView: view, mobileMenuOpen: false }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedPhase: (phase) => set({ selectedPhase: phase }),
}));
