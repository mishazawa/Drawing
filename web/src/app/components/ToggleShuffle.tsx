"use client";

import { useDataStore } from "@/store/providers/data";

export function ToggleShuffle() {
  const isShuffle = useDataStore((s) => s.shuffle);
  const setShuffle = useDataStore((s) => s.setData);

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Shuffle</legend>

        <div className="space-y-2">
          <label
            htmlFor="Option1"
            className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
          >
            <div className="flex items-center">
              &#8203;
              <input
                checked={isShuffle}
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option1"
                onChange={({ target: { checked } }) =>
                  setShuffle("shuffle", checked)
                }
              />
            </div>

            <div>
              <strong className="font-medium text-gray-900">
                Shuffle images
              </strong>

              <p className="mt-1 text-pretty text-sm text-gray-700">
                Show images in random order
              </p>
            </div>
          </label>
        </div>
      </fieldset>
    </div>
  );
}
