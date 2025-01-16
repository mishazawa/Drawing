import { isDesktop } from "@/utils/misc";
import { useEffect } from "react";

export function usePreventSleep() {
  useEffect(() => {
    if (!isDesktop()) return;
    window.electron.preventSleep(true);

    return () => window.electron.preventSleep(false);
  }, []);
}
