import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/store/providers/data";
import { KEY_ESC, KEY_LEFT, KEY_RIGHT, KEY_SPACE } from "@/utils/constants";
import { useElectronSettings } from "./useElectronSettings";

export function useHotkeys() {
  const togglePause = useDataStore((s) => s.toggleTimer);
  const next = useDataStore((s) => s.nextSlide);
  const resetTimer = useDataStore((s) => s.resetTimer);
  const router = useRouter();
  const { hotkeysEnabled } = useElectronSettings();

  function onKey(e: KeyboardEvent) {
    if (e.code === KEY_SPACE) {
      e.preventDefault();
      togglePause();
      return;
    }

    if (e.code === KEY_LEFT) {
      e.preventDefault();
      next(-1);
      resetTimer();
      return;
    }

    if (e.code === KEY_RIGHT) {
      e.preventDefault();
      next();
      resetTimer();
      return;
    }
    if (e.code === KEY_ESC) {
      e.preventDefault();
      return router.back();
    }
  }

  useEffect(() => {
    if (!hotkeysEnabled) return document.removeEventListener("keyup", onKey);
    document.addEventListener("keyup", onKey, false);
    return () => {
      document.removeEventListener("keyup", onKey);
    };
  }, [hotkeysEnabled]);
}
