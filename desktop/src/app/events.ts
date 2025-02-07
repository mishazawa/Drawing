import { ipcMain, powerSaveBlocker, shell } from "electron";
import { EXTERNAL_GITHUB, GITHUB_URL, EXTERNAL_WEB, ENTRY } from "./constants";
import { withMainWindow } from "./utils";
import { getState } from "./state";

export function handleExternalEvents() {
  let preventSleepId = -1;

  stopIfExists(preventSleepId);
  ipcMain.removeAllListeners("prevent-sleep");

  ipcMain.addListener("prevent-sleep", async (_, value: boolean) => {
    if (value) {
      stopIfExists(preventSleepId);
      preventSleepId = powerSaveBlocker.start("prevent-display-sleep");
      return;
    }

    stopIfExists(preventSleepId);
  });

  ipcMain.removeAllListeners("open-external");

  ipcMain.addListener("open-external", async (_, value: string) => {
    if (value === EXTERNAL_GITHUB) {
      return shell.openExternal(GITHUB_URL);
    }
    if (value === EXTERNAL_WEB) {
      return shell.openExternal(ENTRY);
    }
  });

  ipcMain.removeAllListeners("settings");
  ipcMain.addListener("settings", () => {
    withMainWindow().then((win) => {
      win.webContents.send("settings", getState());
    });
  });
}

function stopIfExists(id: number) {
  if (powerSaveBlocker.isStarted(id)) powerSaveBlocker.stop(id);
}
