import { Timer } from "@/app/components/Timer";
import { ButtonLink } from "@/app/components/Button";
import { Slide } from "../components/Slide";
import { Controls } from "../components/Controls";
import { LeftArrow } from "../components/Icons";

export default function Home() {
  return (
    <>
      <div className="p-6 flex flex-col items-stretch bg-grey-lighter min-h-screen">
        <div>
          <ButtonLink href="/">
            <LeftArrow />
          </ButtonLink>
        </div>
        <Timer />
        <Slide />
        <Controls />
      </div>
    </>
  );
}
