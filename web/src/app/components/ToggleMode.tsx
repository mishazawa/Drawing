"use client";
import { useDataStore } from "@/store/providers/data";
import { MODE_CLASS, MODE_TIME } from "@/utils/constants";
import { Toggle } from "./Toggle";

export function ToggleMode() {
  const set = useDataStore((s) => s.setMode);

  function toggleMode(value: boolean) {
    set(value ? MODE_CLASS : MODE_TIME);
  }

  return (
    <div className="flex items-center gap-x-4">
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Time
      </span>
      <Toggle text="Class" onChange={toggleMode} />
    </div>
  );
}
