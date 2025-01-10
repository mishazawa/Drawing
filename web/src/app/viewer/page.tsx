"use client";

import { useEffect } from "react";
import { Timer } from "@/app/components/Timer";
import { useDataStore } from "@/store/providers/data";
import { ButtonLink } from "@/app/components/Button";
import { Slide } from "../components/Slide";
import { Controls } from "../components/Controls";
import { LeftArrow } from "../components/Icons";

const TEST_LIST = [
  "/img/1.png",
  "/img/2.png",
  "/img/3.png",
  "/img/4.png",
  "/img/5.png",
];

export default function Home() {
  const set = useDataStore((s) => s.setData);
  // tmp
  useEffect(() => {
    set("slides", TEST_LIST);
  }, []);

  return (
    <>
      <ButtonLink href="/">
        <LeftArrow />
      </ButtonLink>
      <div>
        <Timer />
        <Slide />
        <Controls />
      </div>
    </>
  );
}
