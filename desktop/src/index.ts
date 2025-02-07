import { app, BrowserWindow, net, protocol } from "electron";
import path from "node:path";
import url from "node:url";

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
  // mainWindow.loadURL("http://localhost:3001");

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    setState({ mainWindowId: mainWindow.id });
    // mainWindow.webContents.openDevTools();
  });
};

protocol.registerSchemesAsPrivileged([
  {
    scheme: "dayo",
    privileges: { bypassCSP: true, secure: true, supportFetchAPI: true },
  },
]);

app.whenReady().then(registerProtocol).then(createMenu).then(createWindow);
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

function registerProtocol() {
  protocol.handle("dayo", (request) => {
    const filePath = request.url.slice("dayo://".length);
    return net.fetch(
      url.pathToFileURL(path.join(__dirname, "..", filePath)).toString()
    );
  });
}
