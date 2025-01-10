// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// Preload (Isolated World)
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  toElectron: () => ipcRenderer.send("switch-context", { target: "electron" }),
  toReact: () => ipcRenderer.send("switch-context", { target: "react" }),
});
