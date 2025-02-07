import * as tf from "@tensorflow/tfjs";
import { PixelData } from "@tensorflow/tfjs";
import { useElectronSettings } from "./useElectronSettings";
import { useYoloContext } from "@/store/providers/model";
import { RefObject, useEffect } from "react";
import { useDataStore } from "@/store/providers/data";

type TFElement =
  | PixelData
  | ImageData
  | HTMLImageElement
  | HTMLCanvasElement
  | HTMLVideoElement
  | ImageBitmap;

export function useAutoZoom(image: RefObject<HTMLImageElement>, deps: any) {
  const { autozoomEnabled } = useElectronSettings();
  const model = useYoloContext();
  const setData = useDataStore((s) => s.setData);

  useEffect(() => {
    if (!autozoomEnabled) return;
    if (!model) return;

    predict(image.current, model)
      .then((values: number[]) => {
        if (!values.length) return Promise.reject();
        const [x, y, ratio] = values;
        setData("autozoom", { x, y, ratio });
      })
      .catch(() => {
        console.info("Can't predict crop");
        setData("autozoom", null);
      });
  }, deps);
}

function padImage(element: TFElement) {
  return tf.tidy(() => {
    const img = tf.browser.fromPixels(element);
    const [h, w] = img.shape.slice(0, 2);

    const size = Math.max(h, w);

    const padded = img.pad([
      [0, size - h],
      [0, size - w],
      [0, 0],
    ]) as unknown as tf.TensorLike;

    return [
      tf.image.resizeBilinear(padded, [640, 640]).div(255.0).expandDims(0),
      w,
      h,
      size / w,
      size / h,
    ];
  }) as unknown as [tf.TensorLike, number, number, number, number];
}

function predict(element: TFElement, model: any): Promise<number[]> {
  return new Promise((res, rej) => {
    const [input, ow, oh, xr, yr] = padImage(element);

    const [boxes, scores] = tf.tidy(() => {
      const outputs: tf.Tensor<tf.Rank> = model
        .execute(input)
        .transpose([0, 2, 1]);

      const w = outputs.slice([0, 0, 2], [-1, -1, 1]);
      const h = outputs.slice([0, 0, 3], [-1, -1, 1]);
      const x1 = tf.sub(outputs.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2));
      const y1 = tf.sub(outputs.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2));

      const boxes = tf
        .concat([y1, x1, tf.add(y1, h), tf.add(x1, w)], 2)
        .squeeze();

      const scores = outputs.slice([0, 0, 4], [-1, -1, 80]).squeeze([0]).max(1);

      return [boxes, scores];
    });

    return tf.image
      .nonMaxSuppressionAsync(
        boxes as unknown as tf.TensorLike,
        scores as unknown as tf.Tensor1D,
        500,
        0.45,
        0.2
      )
      .then((nms) =>
        boxes
          .gather(nms)
          .data()
          .then((out) => {
            tf.dispose([boxes, scores, nms]);
            return out;
          })
      )
      .then((out) => {
        const result = restoreOriginalDimensions(out, [xr, yr], [ow, oh]);
        if (result.length) return res(result);
        return rej();
      });
  });
}

function restoreOriginalDimensions(
  input:
    | Uint8Array<ArrayBufferLike>
    | Float32Array<ArrayBufferLike>
    | Int32Array<ArrayBufferLike>,
  [xr, yr]: [number, number],
  [ow, oh]: [number, number]
) {
  if (!input.length) return [];

  let original: number[] = [];

  const scale = (xr * ow) / 640;

  for (let i = 0; i < input.length; i += 4) {
    let [y1, x1, y2, x2] = input.slice(i, 4);

    x1 *= scale;
    y1 *= scale;
    y2 *= scale;
    x2 *= scale;

    const w = x2 - x1;
    const h = y2 - y1;

    original = [
      ...original,
      x1 + w / 2,
      y1 + h / 2,
      ow <= oh ? oh / h - 0.1 : ow / w - 0.1,
    ];
  }

  return original.filter((i) => i);
}
