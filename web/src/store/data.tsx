import { MODE_TIME, TIME_CONFIG } from "@/utils/constants";
import { createStore } from "zustand/vanilla";

type TimingMode = "time" | "class";

export type State = {
  mode: TimingMode;
  time: number;
  timeCustom: number;
  // ui
  secondsLeft: number;
};

export type Actions = {
  setMode: (mode: TimingMode) => void;
  setTimePreset: (time: number) => void;
  setTimeValue: (time: number) => void;
  setData: (key: string, value: any) => void;
};

const initialState: State = {
  mode: MODE_TIME,
  time: TIME_CONFIG[0][1],
  timeCustom: 1,
  secondsLeft: 0,
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
  }));
}
