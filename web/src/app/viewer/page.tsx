"use client";
import Image from "next/image";
import { useEffect } from "react";
import { Timer } from "@/app/components/Timer";
import { useDataStore } from "@/store/providers/data";
import If from "@/utils/If";

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
    // set("slides", TEST_LIST);
  }, []);

  return (
    <>
      <div>
        <Timer />
        <Slide />
      </div>
    </>
  );
}

function Slide() {
  const slides = useDataStore((s) => s.slides);
  const current = useDataStore((s) => s.currentSlide);

  return (
    <>
      <If v={!!slides[current]}>
        <Image
          src={slides[current]}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </If>
      <If v={!slides[current]}>no slides</If>
    </>
  );
}
