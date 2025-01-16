"use client";
import { useHotkeys } from "@/app/hooks/useHotkeys";
import { usePreventSleep } from "@/app/hooks/usePreventSleep";

export function EventScreenHandler() {
  usePreventSleep();
  useHotkeys();

  return null;
}
