import { ReactNode } from "react";
import { Platform } from "react-native";

type IfNotWebProps = {
  children: ReactNode;
};

export function IfNotWeb({ children }: IfNotWebProps) {
  if (Platform.OS === "web") return null;
  return children;
}

export function IfWeb({ children }: IfNotWebProps) {
  if (Platform.OS !== "web") return null;
  return children;
}
