import { useDataStore } from "@/store/providers/data";
import { ButtonControls } from "./Button";
import If from "@/utils/If";
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
      <div>
        <div className="p-5">
          <div className="flex justify-center items-baseline flex-wrap">
            <div className="flex m-2">
              <ButtonControls
                className="rounded-r-none"
                onClick={() => nextSlide(-1)}
              >
                <LeftArrow />
              </ButtonControls>
              <ButtonControls
                onClick={togglePause}
                className="rounded-r-none rounded-l-none border-l-0 border-r-0"
              >
                <If v={!pause}>
                  <Pause />
                </If>
                <If v={pause}>
                  <Play />
                </If>
              </ButtonControls>
              <ButtonControls
                className="rounded-l-none"
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
