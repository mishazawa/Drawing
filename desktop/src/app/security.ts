import { session } from "electron";
import { ENTRY, PERMISSIONS_HOST } from "./constants";

export function setSessionPermissions() {
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

export function onWebContentsCreated(_event: any, contents: any) {
  contents.on("will-navigate", (event: any, navigationUrl: any) => {
    const parsedUrl = new URL(navigationUrl);

    if (parsedUrl.origin !== ENTRY) {
      event.preventDefault();
    }
  });

  contents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });
}
