"use client";
import { useDataStore } from "@/store/providers/data";
import { MODE_CLASS } from "@/utils/constants";

export function ValuesClassMode() {
  /*
30 minutes
1 hour
1 hour 30 minutes
2 hours
3 hours
6 hours 
*/
  const mode = useDataStore((s) => s.mode);
  return mode === MODE_CLASS && <div className="p-6">not implemented</div>;
}
