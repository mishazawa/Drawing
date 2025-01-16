export function clamp(value: number, min: number, max: number) {
  "worklet";
  return Math.min(max, Math.max(value, min));
}
