"use client";

import If from "@/utils/If";

import { MODE_CLASS, MODE_TIME, TIME_CONFIG } from "@/utils/constants";
import { ButtonLink } from "./Button";
import { useDataStore } from "@/store/providers/data";

export function Menu() {
  const mode = useDataStore((s) => s.mode);
  const set = useDataStore((s) => s.setMode);
  return (
    <>
      <div className="flex items-center p-6 gap-x-4">
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
      <ButtonLink href="/viewer">Start</ButtonLink>
    </>
  );
}

function TimeModeValues() {
  const time = useDataStore((s) => s.time);
  const setTimePreset = useDataStore((s) => s.setTimePreset);
  const seconds = useDataStore((s) => s.timeCustom);
  const setTimeValue = useDataStore((s) => s.setTimeValue);

  return (
    <div className="p-6">
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
