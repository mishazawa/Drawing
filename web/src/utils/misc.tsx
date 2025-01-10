export function formatSeconds(value: number) {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value - hours * 3600) / 60);
  const seconds = value - hours * 3600 - minutes * 60;
  return [leftFillNum(hours), leftFillNum(minutes), leftFillNum(seconds)].join(
    ":"
  );
}

function leftFillNum(num: number, target: number = 2) {
  return num.toString().padStart(target, "0");
}
