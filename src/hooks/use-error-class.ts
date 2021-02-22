import { useEffect, useRef, useState } from "react";

export type ErrorClass = "" | "error" | "error fading";

export const useErrorClass = (showTime = 3000, fadeTime = 500) => {
  const [errorClass, setErrorClass] = useState<ErrorClass>("");
  const errorTimer = useRef<number | null>(null);
  const clearTimer = () => errorTimer.current ? clearTimeout(errorTimer.current) : undefined;

  const _setErrorClass = (error: ErrorClass) => {
    clearTimer();
    // show the error
    setErrorClass(error);
    if (error === "error") {
      errorTimer.current = window.setTimeout(() => {
        // fade the error
        setErrorClass("error fading");
        errorTimer.current = window.setTimeout(() => {
          // remove the error
          setErrorClass("");
          errorTimer.current = null;
        }, fadeTime);
      }, showTime);
    }
  };

  useEffect(() => {
    return clearTimer;
  }, []);

  return [errorClass, _setErrorClass] as const;
};
