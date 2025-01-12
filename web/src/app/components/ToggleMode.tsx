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
      <Toggle text="Class" leftText="Time" onChange={toggleMode} />
    </div>
  );
}
