"use client";

import { useDataStore } from "@/store/providers/data";
import { ButtonControls } from "./Button";
import If from "@/app/components/If";
import { LeftArrow, Pause, Play, RightArrow } from "./Icons";

export function Controls() {
  const pause = useDataStore((s) => s.pause);

  const next = useDataStore((s) => s.nextSlide);
  const resetTimer = useDataStore((s) => s.resetTimer);
  const togglePause = useDataStore((s) => s.toggleTimer);

  function nextSlide(v: number) {
    next(v);
    resetTimer();
  }

  return (
    <>
      <div className="p-5">
        <div className="flex justify-center items-baseline flex-wrap">
          <div>
            <div
              className="inline-flex rounded-s-lg rounded-e-lg shadow-sm bg-gradient-to-r from-blue-500 to-blue-600"
              role="group"
            >
              <ButtonControls
                className="border rounded-s-lg"
                onClick={() => nextSlide(-1)}
              >
                <LeftArrow />
              </ButtonControls>
              <ButtonControls
                onClick={togglePause}
                className="border-t border-b"
              >
                <If v={!pause}>
                  <Pause />
                </If>
                <If v={pause}>
                  <Play />
                </If>
              </ButtonControls>
              <ButtonControls
                className="border rounded-e-lg"
                onClick={() => nextSlide(1)}
              >
                <RightArrow />
              </ButtonControls>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
