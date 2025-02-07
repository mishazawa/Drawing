// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// Preload (Isolated World)
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  preventSleep: (val: boolean) => ipcRenderer.send("prevent-sleep", val),
  openExternal: (val: string) => ipcRenderer.send("open-external", val),
  getSettings: () => {
    return new Promise((res) => {
      ipcRenderer.on("settings", (_, data) => {
        ipcRenderer.removeAllListeners("settings");
        res(data);
      });
      ipcRenderer.send("settings");
    });
  },
});
