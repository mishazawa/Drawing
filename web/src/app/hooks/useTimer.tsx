import { Timer, TimerApi } from "@/utils/timer";
import { useEffect, useRef } from "react";

export function useTimer(
  interval: number,
  onEnd: () => void,
  onTick: (left: number) => void
) {
  const timer = useRef<TimerApi>(null!);

  useEffect(() => {
    if (timer.current) {
      timer.current.pause();
    }

    timer.current = Timer();
    timer.current.setCallback(onEnd);
    timer.current.setTickCallback(onTick);
    timer.current.setTime(interval);
    timer.current.start();
  }, [interval]);

  useEffect(() => () => timer.current.pause(), []);
}
