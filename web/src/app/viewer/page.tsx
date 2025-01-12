import { ProgressBar, Timer } from "@/app/components/Timer";
import { ButtonLink } from "@/app/components/Button";
import { Slide } from "../components/Slide";
import { Controls } from "../components/Controls";
import { LeftArrow } from "../components/Icons";

export default function Home() {
  return (
    <>
      <div className="p-6 flex flex-col items-stretch bg-grey-lighter min-h-screen">
        <div className="fixed z-10">
          <ButtonLink href="/">
            <LeftArrow />
          </ButtonLink>
        </div>
        <div className="fixed right-5 z-10">
          <Timer />
        </div>
        <Slide />
        <div className="fixed bottom-5 left-0 right-0">
          <Controls />
        </div>
        <div className="fixed bottom-0 left-0 right-0 -mb-4">
          <ProgressBar />
        </div>
      </div>
    </>
  );
}
