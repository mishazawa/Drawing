"use client";

import { useEffect } from "react";
import { useDataStore } from "@/store/providers/data";
import { ButtonControls } from "./Button";
import If from "@/app/components/If";
import { LeftArrow, Pause, Play, RightArrow } from "./Icons";

import { useHideControls } from "@/app/hooks/useHideControls";

export function Controls() {
  const pause = useDataStore((s) => s.pause);

  const next = useDataStore((s) => s.nextSlide);
  const resetTimer = useDataStore((s) => s.resetTimer);
  const togglePause = useDataStore((s) => s.toggleTimer);
  const setData = useDataStore((s) => s.setData);

  const hideUi = useHideControls();

  function nextSlide(v: number) {
    next(v);
    resetTimer();
  }

  useEffect(() => () => setData("pause", false), []);

  return (
    <>
      <div className={hideUi ? "hidden" : "" + " p-5 transition-all"}>
        <div className="flex justify-center items-baseline flex-wrap">
          <div>
            <div
              className="inline-flex rounded-s-lg rounded-e-lg shadow-sm bg-slate-50"
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
