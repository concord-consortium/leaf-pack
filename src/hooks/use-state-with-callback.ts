// cf. https://github.com/the-road-to-learn-react/use-state-with-callback
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";

const useStateWithCallback = <T>(initialState: T, callback: (state?: T) => void) => {
  const [state, setState] = useState(initialState);

  useEffect(() => callback(state), [state, callback]);

  return [state, setState] as const;
};

const useStateWithCallbackInstant = <T>(initialState: T, callback: (state?: T) => void) => {
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => callback(state), [state, callback]);

  return [state, setState] as const;
};

const useStateWithCallbackLazy = <T>(initialState: T) => {
  const callbackRef = useRef<((state?: T) => void) | null>(null);

  const [value, setValue] = useState(initialState);

  useEffect(() => {
    callbackRef.current?.(value);
    callbackRef.current = null;
  }, [value]);

  const setValueWithCallback = useCallback((newValueOrFn: React.SetStateAction<T>, callback?: (state?: T) => void) => {
    callbackRef.current = callback ?? null;
    setValue(newValueOrFn);
  }, []);

  return [value, setValueWithCallback] as const;
};

export { useStateWithCallbackInstant, useStateWithCallbackLazy };

export default useStateWithCallback;
