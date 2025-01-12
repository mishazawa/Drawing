"use client";
import { useDataStore } from "@/store/providers/data";
import { MODE_TIME, TIME_CONFIG } from "@/utils/constants";

export function ValuesTimeMode() {
  const time = useDataStore((s) => s.time);
  const setTimePreset = useDataStore((s) => s.setTimePreset);
  const seconds = useDataStore((s) => s.timeCustom);
  const setTimeValue = useDataStore((s) => s.setTimeValue);
  const mode = useDataStore((s) => s.mode);

  return (
    mode === MODE_TIME && (
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
    )
  );
}
