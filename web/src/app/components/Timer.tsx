"use client";

import { useDataStore } from "@/store/providers/data";
import { useEffect } from "react";
import { useTimer } from "@/app/hooks/useTimer";
import { calculatePercent, formatSeconds } from "@/utils/misc";

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

  return <div className="text-center mb-1">{formatSeconds(left)}</div>;
}

export function ProgressBar({ text }: { text?: string }) {
  const time = useDataStore((s) => s.time);
  const timec = useDataStore((s) => s.timeCustom);
  const left = useDataStore((s) => s.secondsLeft);

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
      <div
        className="transition-all bg-blue-300 h-1.5 rounded-full dark:bg-blue-500 text-blue-100 text-center p-0.5"
        style={{
          width: calculatePercent(left, time === -1 ? timec : time) + "%",
        }}
      >
        {text}
      </div>
    </div>
  );
}
