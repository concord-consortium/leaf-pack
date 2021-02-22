import { useEffect, useRef, useState } from "react";

export type ErrorClass = "" | "error" | "error fading";

export const useErrorClass = () => {
  const [errorClass, setErrorClass] = useState<ErrorClass>("");
  const errorTimer = useRef<number | null>(null);
  const clearTimer = () => errorTimer.current ? clearTimeout(errorTimer.current) : undefined;

  const _setErrorClass = (error: ErrorClass) => {
    clearTimer();
    setErrorClass(error);
    if (error === "error") {
      errorTimer.current = window.setTimeout(() => {
        setErrorClass("error fading");
        errorTimer.current = null;
      }, 3000);
    }
  };

  useEffect(() => {
    return clearTimer;
  }, []);

  return [errorClass, _setErrorClass] as const;
};
