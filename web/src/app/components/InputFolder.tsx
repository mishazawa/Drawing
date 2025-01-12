"use client";
import { useDataStore } from "@/store/providers/data";
import { shuffle } from "@/utils/misc";
import { ChangeEvent, DragEvent, useEffect } from "react";

import If from "./If";

export function InputFolder() {
  const set = useDataStore((s) => s.setData);

  const originalSlides = useDataStore((s) => s.originalSlides);
  const isShuffle = useDataStore((s) => s.shuffle);

  function onFiles(e: ChangeEvent<HTMLInputElement>) {
    set("slides", e.currentTarget.files);
    set("originalSlides", e.currentTarget.files);
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
  }

  useEffect(() => {
    set("currentSlide", 0);
    if (!isShuffle) {
      set("slides", originalSlides);
      return;
    }
    set("slides", shuffle(originalSlides));
  }, [isShuffle, originalSlides]);

  function onFilesDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();

    if (event.dataTransfer?.files.length) {
      set("slides", event.dataTransfer?.files);
      set("originalSlides", event.dataTransfer?.files);
      return;
    }
  }

  return (
    <div
      className="flex items-center justify-center w-full"
      onDrop={onFilesDrop}
      onDragOver={dragOverHandler}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to pick images</span> or drag
            and drop (folder is not implemented)
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <If v={!!originalSlides.length}>
              Picked {originalSlides.length} images
            </If>
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={onFiles}
          accept="image/*"
          multiple
        />
      </label>
    </div>
    // <div className="flex gap-4">

    //   <ButtonControls onClick={openFolder}>Choose folder</ButtonControls>
    //   <input
    //     type="file"
    //     ref={inputRef}
    //     className="hidden"
    //     onChange={onFiles}
    //     accept="image/*"
    //     multiple
    //   />

    //   <span className="inline-block pt-2">
    //     <If v={!!originalSlides.length}>{originalSlides.length} images</If>
    //   </span>
    // </div>
  );
}
