export type ElectronSettings = {
  hotkeysEnabled: boolean;
  autozoomEnabled: boolean;
};

type Electron = {
  preventSleep: (val: boolean) => void;
  getSettings: () => Promise<ElectronSettings>;
};

declare global {
  interface Window {
    electron: Electron;
  }
}

export default {};
