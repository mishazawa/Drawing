const STEP = 100;
const SECOND = 1000;

export type TimerApi = {
  start: () => void;
  pause: () => void;
  setTime: (interval: number) => void;
  setCallback: (fn: () => void) => void;
  setTickCallback: (fn: (left: number) => void) => void;
};

export function Timer(): TimerApi {
  // params
  let _interval = Infinity;
  let _func = () => {};
  let _tick = (_: number) => {};
  // state
  let count = _interval;
  let time = SECOND;
  let timerId: any = 0;

  function start() {
    clearTimeout(timerId);
    timerId = setTimeout(function request() {
      time -= STEP;

      if (time === 0) {
        count -= 1;
        time = SECOND;
        _tick(count);
      }

      if (count === 0) {
        _func();
        count = _interval;
        time = SECOND;
      }

      timerId = setTimeout(request, STEP);
    }, STEP);
  }

  function pause() {
    clearTimeout(timerId);
  }

  function setTime(interval: number) {
    _interval = interval;
    // reset
    count = _interval;
    time = SECOND;
  }

  function setCallback(fn: () => void) {
    _func = fn;
  }

  function setTickCallback(fn: (left: number) => void) {
    _tick = fn;
  }
  return { start, pause, setCallback, setTime, setTickCallback };
}
