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

export function isDesktop() {
  return global.window.electron !== undefined;
}

export function shuffle(array: any[]) {
  let idx = array.length;
  const copy = [...array];

  while (idx != 0) {
    const rnd = Math.floor(Math.random() * idx);
    idx--;

    [copy[idx], copy[rnd]] = [copy[rnd], copy[idx]];
  }
  return copy;
}
