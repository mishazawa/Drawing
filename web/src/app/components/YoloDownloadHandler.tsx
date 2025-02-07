"use client";
import { YoloContext } from "@/store/providers/model";
import { MODEL_URL } from "@/utils/constants";
import { isDesktop } from "@/utils/misc";
import { GraphModel, loadGraphModel } from "@tensorflow/tfjs";
import { ReactNode, useEffect, useState } from "react";

export function YoloDownloadHandler({ children }: { children: ReactNode }) {
  const [model, setModel] = useState<GraphModel>(null!);

  useEffect(() => {
    if (!isDesktop()) return;
    loadGraphModel(MODEL_URL)
      .then((data) => setModel(data))
      .catch(() => console.log("Can't load model."));
  }, []);

  return <YoloContext.Provider value={model}>{children}</YoloContext.Provider>;
}
