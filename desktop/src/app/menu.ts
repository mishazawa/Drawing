import { app, BrowserWindow, Menu, MenuItem } from "electron";
import { noop, withMainWindow } from "./utils";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export function createMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                label: "About",
                click: openAboutPopup,
              },
              {
                label: "Over the top",
                toolTip: "Show window over other windows",
                type: "checkbox",
                checked: false,
                accelerator: isMac ? "Alt+Cmd+I" : "Alt+Shift+I",
                click({ checked }: MenuItem) {
                  toggleOverTheTop(checked);
                },
              },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template as unknown as any));
  return Promise.resolve();
}

function toggleOverTheTop(value: boolean) {
  withMainWindow()
    .then((win: BrowserWindow) => {
      win.setAlwaysOnTop(value);
      win.setWindowButtonVisibility(!value);
    })
    .catch(noop);
}

function openAboutPopup() {
  withMainWindow()
    .then((win: BrowserWindow) => {
      const child = new BrowserWindow({
        parent: win,
        modal: true,
        show: false,
        height: 256,
        width: 420,
        webPreferences: {
          preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
      });

      child.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
      child.once("ready-to-show", () => {
        child.show();
      });
    })
    .catch(noop);
}
