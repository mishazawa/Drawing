import { useDataStore } from "@/store/providers/data";
import { MODE_CLASS, MODE_TIME } from "@/utils/constants";

export function ToggleMode() {
  const mode = useDataStore((s) => s.mode);
  const set = useDataStore((s) => s.setMode);
  return (
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
  );
}
