"use client";

import Image from "next/image";

import If from "@/app/components/If";
import { useDataStore } from "@/store/providers/data";
import { useEffect, useState } from "react";

export function Slide() {
  const slides = useDataStore((s) => s.slides);
  const current = useDataStore((s) => s.currentSlide);
  const [src, set] = useState("");
  useEffect(() => {
    if (!slides[current]) return;

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        set(reader.result as string);
      },
      false
    );

    reader.readAsDataURL(slides[current]);
  }, [current, slides]);

  return (
    <>
      <If v={!!src}>
        <div className="flex-1 w-full relative flex justify-center align-center">
          <Image
            className="object-scale-down object-center"
            src={src}
            fill
            alt="/"
          />
        </div>
      </If>
      <If v={!src}>no slides</If>
    </>
  );
}
