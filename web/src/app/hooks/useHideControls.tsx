import { HIDE_TIME } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";

export function useHideControls() {
  const [hidden, set] = useState(false);
  const timer = useRef<any>(null!);

  function resetControls() {
    if (timer.current) clearTimeout(timer.current);

    set(false);

    timer.current = setTimeout(() => {
      set(true);
    }, HIDE_TIME);
  }

  useEffect(() => {
    document.addEventListener("mousemove", resetControls);

    //init
    resetControls();

    return () => document.removeEventListener("mousemove", resetControls);
  }, []);

  return hidden;
}
