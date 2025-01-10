"use client";

import { useDataStore } from "@/store/providers/data";
import { useEffect } from "react";
import { useTimer } from "@/app/hooks/useTimer";
import { formatSeconds } from "@/utils/misc";

export function Timer() {
  const left = useDataStore((s) => s.secondsLeft);
  const set = useDataStore((s) => s.setData);
  const nextSlide = useDataStore((s) => s.nextSlide);
  const resetTimer = useDataStore((s) => s.resetTimer);

  useTimer(
    () => nextSlide(),
    (v) => set("secondsLeft", v)
  );

  useEffect(() => resetTimer, []);

  return <div>{formatSeconds(left)}</div>;
}
