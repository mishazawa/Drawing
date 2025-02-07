import { createContext, useContext } from "react";
import * as tf from "@tensorflow/tfjs";

export const YoloContext = createContext<tf.GraphModel<
  string | tf.io.IOHandler
> | null>(null);

export function useYoloContext() {
  const model = useContext(YoloContext);
  return model;
}
