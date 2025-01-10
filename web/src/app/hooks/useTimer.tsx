import { useDataStore } from "@/store/providers/data";
import { Timer, TimerApi } from "@/utils/timer";
import { useEffect, useRef } from "react";

export function useTimer(onEnd: () => void, onTick: (left: number) => void) {
  const isTimerPaused = useDataStore((s) => s.pause);
  const time = useDataStore((s) => s.time);
  const reset = useDataStore((s) => s.reset);
  const seconds = useDataStore((s) => s.timeCustom);
  const timer = useRef<TimerApi>(Timer());

  const interval = time === -1 ? seconds : time;

  useEffect(() => {
    timer.current.pause();
    timer.current.setTime(interval);
    timer.current.setCallback(onEnd);
    timer.current.setTickCallback(onTick);

    if (!isTimerPaused) timer.current.start();
  }, [interval, reset]);

  useEffect(
    () => () => {
      timer.current.pause();
      timer.current.setTime(interval);
    },
    []
  );

  useEffect(
    () => (isTimerPaused ? timer.current.pause?.() : timer.current.start?.()),
    [isTimerPaused]
  );
}
