"use client";

import { useDataStore } from "@/store/providers/data";
import { useEffect } from "react";
import { useTimer } from "@/app/hooks/useTimer";
import { formatSeconds } from "@/utils/misc";

export function Timer() {
  const time = useDataStore((s) => s.time);
  const seconds = useDataStore((s) => s.timeCustom);
  const left = useDataStore((s) => s.secondsLeft);
  const set = useDataStore((s) => s.setData);
  const nextSlide = useDataStore((s) => s.nextSlide);

  useTimer(
    time === -1 ? seconds : time,
    () => nextSlide(),
    (v) => set("secondsLeft", v)
  );

  useEffect(() => () => set("secondsLeft", time === -1 ? seconds : time), []);

  return <div>{formatSeconds(left)}</div>;
}
