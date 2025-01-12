"use client";
import { useDataStore } from "@/store/providers/data";
import { shuffle } from "@/utils/misc";
import { useRef, ChangeEvent, useEffect } from "react";
import { ButtonControls } from "./Button";
import If from "./If";

export function InputFolder() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const set = useDataStore((s) => s.setData);

  const originalSlides = useDataStore((s) => s.originalSlides);
  const isShuffle = useDataStore((s) => s.shuffle);

  function openFolder() {
    inputRef.current.click();
  }

  function onFiles(e: ChangeEvent<HTMLInputElement>) {
    set("slides", e.currentTarget.files);
    set("originalSlides", e.currentTarget.files);
  }

  useEffect(() => {
    set("currentSlide", 0);
    if (!isShuffle) {
      set("slides", originalSlides);
      return;
    }
    set("slides", shuffle(originalSlides));
  }, [isShuffle, originalSlides]);

  return (
    <div className="flex gap-4">
      <ButtonControls onClick={openFolder}>Choose folder</ButtonControls>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={onFiles}
        accept="image/*"
        multiple
      />

      <span className="inline-block pt-2">
        <If v={!!originalSlides.length}>{originalSlides.length} images</If>
      </span>
    </div>
  );
}
