import panzoom, { PanZoom } from "panzoom";
import { useEffect, useRef } from "react";

const ZOOM_CONFIG = {
  minZoom: 1,
  maxZoom: 4,
  initialZoom: 1,
  bounds: true,
  boundsPadding: 1,
  smoothScroll: false,
  filterKey: () => true,
};

export function usePanZoom(deps: any[]) {
  const image = useRef(null!);
  const zoomer = useRef<PanZoom>(null!);

  useEffect(() => {
    if (!image.current) return;
    if (zoomer.current) zoomer.current.dispose();
    zoomer.current = panzoom(image.current, ZOOM_CONFIG);
  }, deps);

  useEffect(() => {
    return () => zoomer.current && zoomer.current.dispose();
  }, []);

  return [image];
}
