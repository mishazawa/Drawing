import {
  app,
  BrowserWindow,
  ipcMain,
  powerSaveBlocker,
  session,
} from "electron";
import { URL } from "url";
import { ENTRY, PERMISSIONS_HOST } from "./constants";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).

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
  });

  handleEvents();

  mainWindow.loadURL(ENTRY);
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.on("web-contents-created", (_event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (parsedUrl.origin !== ENTRY) {
      event.preventDefault();
    }
  });
});

app.on("web-contents-created", (_event, contents) => {
  contents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });
});

function setSessionPermissions() {
  session.defaultSession.setPermissionRequestHandler(
    (webContents, _, callback) => {
      const parsedUrl = new URL(webContents.getURL());

      if (
        parsedUrl.protocol !== "https:" ||
        parsedUrl.host !== PERMISSIONS_HOST
      ) {
        // Denies the permissions request
        return callback(false);
      }
    }
  );
}

function handleEvents() {
  let preventSleepId = -1;

  stopIfExists(preventSleepId);
  ipcMain.removeHandler("prevent-sleep");

  ipcMain.handle("prevent-sleep", async (_, value: boolean) => {
    if (value) {
      stopIfExists(preventSleepId);
      preventSleepId = powerSaveBlocker.start("prevent-display-sleep");
      return;
    }

    stopIfExists(preventSleepId);
  });
}

function stopIfExists(id: number) {
  if (powerSaveBlocker.isStarted(id)) powerSaveBlocker.stop(id);
}
