"use client";

import If from "@/utils/If";

import { MODE_CLASS, MODE_TIME, TIME_CONFIG } from "@/utils/constants";
import { ButtonControls, ButtonLink } from "./Button";
import { useDataStore } from "@/store/providers/data";
import { ChangeEvent, useRef, useState } from "react";

export function Menu() {
  const mode = useDataStore((s) => s.mode);
  const set = useDataStore((s) => s.setMode);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex items-center gap-x-4">
        <label htmlFor="1">
          <div className="flex gap-x-2">
            <input
              name="mode"
              type="radio"
              id="1"
              checked={mode === MODE_TIME}
              onChange={() => set(MODE_TIME)}
            />
            {MODE_TIME}
          </div>
        </label>
        <label htmlFor="2">
          <div className="flex gap-x-2">
            <input
              name="mode"
              type="radio"
              id="2"
              checked={mode === MODE_CLASS}
              onChange={() => set(MODE_CLASS)}
            />
            {MODE_CLASS}
          </div>
        </label>
      </div>
      <If v={mode === MODE_TIME}>
        <TimeModeValues />
      </If>
      <If v={mode === MODE_CLASS}>
        <StudioModeValues />
      </If>
      <InputFolder />
      <div>
        <ButtonLink href="/viewer">Start</ButtonLink>
      </div>
    </div>
  );
}

function TimeModeValues() {
  const time = useDataStore((s) => s.time);
  const setTimePreset = useDataStore((s) => s.setTimePreset);
  const seconds = useDataStore((s) => s.timeCustom);
  const setTimeValue = useDataStore((s) => s.setTimeValue);

  return (
    <div>
      {TIME_CONFIG.map(([t, v]) => {
        return (
          <label htmlFor={t} key={t}>
            <div className="flex gap-x-2">
              <input
                type="radio"
                name="time"
                id={t}
                checked={time === v}
                onChange={() => setTimePreset(v)}
              />
              {t}
            </div>
          </label>
        );
      })}
      <label htmlFor="tentacles">
        <div className="flex gap-x-2">
          seconds:
          <input
            type="number"
            id="tentacles"
            name="tentacles"
            min="1"
            disabled={time !== -1}
            onChange={({ target: { value } }) => setTimeValue(+value)}
            value={seconds}
          />
        </div>
      </label>
    </div>
  );
}

function StudioModeValues() {
  /*
30 minutes
1 hour
1 hour 30 minutes
2 hours
3 hours
6 hours 
*/
  return <div className="p-6">not implemented</div>;
}

function InputFolder() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const set = useDataStore((s) => s.setData);
  const slides = useDataStore((s) => s.slides);
  function openFolder() {
    if (window.electron !== undefined) return;
    inputRef.current.click();
  }

  function onFiles(e: ChangeEvent<HTMLInputElement>) {
    set("slides", e.currentTarget.files);
  }

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
        <If v={!!slides.length}>{slides.length} images</If>
      </span>
    </div>
  );
}
