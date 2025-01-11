import { MODE_TIME, TIME_CONFIG } from "@/utils/constants";
import { createStore } from "zustand/vanilla";

type TimingMode = "time" | "class";

export type State = {
  mode: TimingMode;
  time: number;
  timeCustom: number;
  // ui
  secondsLeft: number;
  currentSlide: number;
  slides: File[];
  originalSlides: File[];
  reset: number;
  pause: boolean;
  shuffle: boolean;
};

export type Actions = {
  setMode: (mode: TimingMode) => void;
  setTimePreset: (time: number) => void;
  setTimeValue: (time: number) => void;
  setData: (key: keyof State, value: any) => void;
  nextSlide: (dir?: number) => void;
  resetTimer: () => void;
  toggleTimer: () => void;
};

const initialState: State = {
  mode: MODE_TIME,
  time: TIME_CONFIG[0][1],
  timeCustom: 1,
  secondsLeft: 0,
  currentSlide: 0,
  slides: [],
  originalSlides: [],
  reset: 0,
  pause: false,
  shuffle: false,
};

export const initMenuStore = (): State => {
  return { ...initialState };
};

export function createMenuStore(initState: State = initialState) {
  return createStore<State & Actions>()((set) => ({
    ...initState,
    setData: (key: string, value: any) => set({ [key]: value }),
    setMode: (mode: TimingMode) => set({ mode }),
    setTimePreset: (time: number) => set({ time, secondsLeft: time }),
    setTimeValue: (time: number) =>
      set({ timeCustom: time, secondsLeft: time }),
    resetTimer: () =>
      set((s) => ({
        reset: Math.random(),
        secondsLeft: s.time === -1 ? s.timeCustom : s.time,
      })),
    nextSlide: (dir: number = 1) =>
      set((state) => {
        const a =
          state.currentSlide + dir < 0
            ? state.slides.length - 1
            : state.currentSlide + dir;
        return {
          currentSlide: a % state.slides.length,
        };
      }),
    toggleTimer: () => set((s) => ({ pause: !s.pause })),
  }));
}
