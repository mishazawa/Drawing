import { produce } from "immer";

type WindowState = {
  mainWindowId: number;
  popupWindowId: number;
  hotkeysEnabled: boolean;
  autozoomEnabled: boolean;
};

let baseState: WindowState = {
  mainWindowId: -1,
  popupWindowId: -1,
  hotkeysEnabled: true,
  autozoomEnabled: false,
};

export function getState() {
  return { ...baseState };
}

export function setState(data: Partial<WindowState>) {
  baseState = produce(baseState, (draftState) => {
    draftState = { ...draftState, ...data };
    return draftState;
  });
}
