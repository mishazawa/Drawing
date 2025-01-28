import { app, BrowserWindow } from "electron";

import { ENTRY } from "./app/constants";
import { setState } from "./app/state";
import { handleExternalEvents } from "./app/events";
import { createMenu } from "./app/menu";
import { onWebContentsCreated, setSessionPermissions } from "./app/security";

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  setSessionPermissions();
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: "../images/icon.png",
    height: 1080,
    width: 1280,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
  });

  handleExternalEvents();

  mainWindow.loadURL(ENTRY);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    setState({ mainWindowId: mainWindow.id });
  });
};

app.whenReady().then(createMenu).then(createWindow);
app.on("web-contents-created", onWebContentsCreated);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
