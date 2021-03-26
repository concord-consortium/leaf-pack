import { useRef } from "react";

export const useFadeIn = (duration?: number) => {
  const t0 = useRef(performance.now());
  return duration ? (performance.now() - t0.current) / duration : 1;
};
