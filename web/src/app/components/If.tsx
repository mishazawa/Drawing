import { ReactNode } from "react";

type IfProps = {
  v: boolean;
  children: ReactNode | string;
};

export default function If(props: IfProps) {
  if (props.v) return props.children;
  return null;
}
