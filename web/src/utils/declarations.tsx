type Electron = {
  preventSleep: (val: boolean) => void;
};

declare global {
  interface Window {
    electron: Electron;
  }
}

export default {};
