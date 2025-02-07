import { BrowserWindow } from "electron";
import { getState } from "./state";

export function noop() {}

export function withMainWindow(): Promise<BrowserWindow> {
  return new Promise((res, rej) => {
    const state = getState();
    const win = BrowserWindow.fromId(state.mainWindowId);
    if (!win) return rej();
    return res(win);
  });
}
