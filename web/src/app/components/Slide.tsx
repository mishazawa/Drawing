import Image from "next/image";

import If from "@/utils/If";
import { useDataStore } from "@/store/providers/data";

export function Slide() {
  const slides = useDataStore((s) => s.slides);
  const current = useDataStore((s) => s.currentSlide);

  return (
    <>
      <If v={!!slides[current]}>
        <div className="max-w-md mx-auto h-48 w-full relative">
          <Image
            className="object-none object-contain object-center"
            src={slides[current]}
            fill
            alt="/"
          />
        </div>
      </If>
      <If v={!slides[current]}>no slides</If>
    </>
  );
}
