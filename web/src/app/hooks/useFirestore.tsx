import { getDb } from "@/utils/firebase";
import { useRef } from "react";

export function useFirestore() {
  const fb = useRef(getDb());
  return fb.current;
}
