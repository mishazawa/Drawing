"use client";

import Image from "next/image";

import If from "@/app/components/If";
import { useDataStore } from "@/store/providers/data";
import { useEffect, useRef, useState } from "react";

import { usePanZoom } from "@/app/hooks/usePanZoom";
import { useAutoZoom } from "../hooks/useAutoZoom";

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

  const [image] = usePanZoom([src]);
  useAutoZoom(image, [src]);

  return (
    <>
      <If v={!!src}>
        <div className="flex-1 w-full relative flex justify-center align-center overflow-hidden">
          {/* <If v={autozoom !== null}>
            <div
              style={{
                position: "absolute",
                left: autozoom ? autozoom!.x : 0,
                top: autozoom ? autozoom!.y : 0,
                width: autozoom ? autozoom!.w : 0,
                height: autozoom ? autozoom!.h : 0,
                backgroundColor: "#FF00FF33",
                zIndex: 999,
              }}
            >
              debug
            </div>
          </If> */}
          <Image
            ref={image}
            src={src}
            fill
            className="object-scale-down object-center"
            alt="/"
          />
        </div>
      </If>
      <If v={!src}>
        <div className="object-scale-down object-center">no slides</div>
      </If>
    </>
  );
}
