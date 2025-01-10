"use client";

import { useDataStore } from "@/store/providers/data";

import { useTimer } from "../hooks/useTimer";
import { useEffect } from "react";

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
  const set = useDataStore((s) => s.setData);
  const left = useDataStore((s) => s.secondsLeft);

  useTimer(
    time === -1 ? seconds : time,
    () => console.log(Date()),
    (v) => set("secondsLeft", v)
  );

  useEffect(() => () => set("secondsLeft", time === -1 ? seconds : time), []);

  return <div>{left}</div>;
}
