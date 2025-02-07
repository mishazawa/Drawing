import { ElectronSettings } from "@/utils/declarations";
import { isDesktop } from "@/utils/misc";
import { useState, useEffect } from "react";

const SETTINGS_DEFAULT: ElectronSettings = {
  hotkeysEnabled: true,
  autozoomEnabled: false,
};

export function useElectronSettings() {
  const [settings, set] = useState(SETTINGS_DEFAULT);

  useEffect(() => {
    if (!isDesktop()) return set(SETTINGS_DEFAULT);
    global.window.electron.getSettings().then(set);
  }, []);
  return settings;
}
