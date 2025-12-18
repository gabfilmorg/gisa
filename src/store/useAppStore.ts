import { create } from 'zustand';

interface AppState {
  hasStarted: boolean;
  startExperience: () => void;
  isAudioMuted: boolean;
  toggleAudio: () => void;
  currentWheel: number;
  setWheel: (index: number) => void;
  cursorColor: string;
  setCursorColor: (color: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  hasStarted: false,
  startExperience: () => set({ hasStarted: true }),
  isAudioMuted: false,
  toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),
  currentWheel: 0,
  setWheel: (index) => set({ currentWheel: index }),
  cursorColor: '#00D4FF', // Default Neon Blue
  setCursorColor: (color) => set({ cursorColor: color }),
}));
