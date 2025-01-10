"use client";

import { useDataStore } from "@/store/providers/data";

import { useTimer } from "../hooks/useTimer";

export default function Home() {
  return (
    <>
      <div>
        <Timer />
      </div>
    </>
  );
}

function Timer() {
  const time = useDataStore((s) => s.time);
  const seconds = useDataStore((s) => s.timeCustom);
  const left = useDataStore((s) => s.secondsLeft);
  const set = useDataStore((s) => s.setData);

  useTimer(
    time === -1 ? seconds : time,
    () => console.log(Date()),
    (v) => set("secondsLeft", v)
  );

  return <div>{left}</div>;
}
