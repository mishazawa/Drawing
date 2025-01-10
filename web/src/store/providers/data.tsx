"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { createMenuStore, initMenuStore, Actions, State } from "@/store/data";
import { useStore } from "zustand";

export type StoreApi = ReturnType<typeof createMenuStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi>(null!);

  if (!storeRef.current) {
    storeRef.current = createMenuStore(initMenuStore());
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useDataStore = <T,>(
  selector: (store: Actions & State) => T
): T => {
  const counterStoreContext = useContext(StoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
