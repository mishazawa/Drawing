type Electron = {
  toElectron: () => void;
};

declare global {
  interface Window {
    electron: Electron;
  }
}

export default {};
