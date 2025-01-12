"use client";

import { useDataStore } from "@/store/providers/data";
import { MODE_TIME, TIME_CONFIG } from "@/utils/constants";
import { ListElement } from "./ListElement";
import { ModeDescription } from "./ModeDescription";

export function ValuesTimeMode() {
  const time = useDataStore((s) => s.time);
  const setTimePreset = useDataStore((s) => s.setTimePreset);
  const seconds = useDataStore((s) => s.timeCustom);
  const setTimeValue = useDataStore((s) => s.setTimeValue);
  const mode = useDataStore((s) => s.mode);

  const text = useTimeModeDescription();

  return (
    mode === MODE_TIME && (
      <div className="flex flex-col gap-6 grid md:grid-cols-2">
        <ul className="grid gap-2 md:grid-cols-1">
          {TIME_CONFIG.map(([t, v]) => (
            <ListElement
              key={t}
              checked={time === v}
              id={t}
              onChange={() => setTimePreset(v)}
            />
          ))}
          <div>
            <label
              htmlFor="customTime"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Custom time (seconds):
            </label>
            <input
              type="number"
              id="customTime"
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " +
                (time !== -1 ? "cursor-not-allowed" : "")
              }
              min="1"
              disabled={time !== -1}
              onChange={({ target: { value } }) => setTimeValue(+value)}
              value={seconds}
            />
          </div>
        </ul>
        <ModeDescription text={text} />
      </div>
    )
  );
}

function useTimeModeDescription() {
  const time = useDataStore((s) => s.time);
  const seconds = useDataStore((s) => s.timeCustom);

  const v = time === -1 ? seconds : time;

  return `Switch image with ${v} seconds interval.`;
}
