import hash from "string-hash";
import { useEffect, useRef } from "react";

export const hashString = (str: string) => {
  return hash(str);
};

export const hashStrings = (strings: string[]) => {
  const map: Record<string, string> = {};
  strings.forEach(str => map[hash(str)] = str);
  return map;
};

export const useHashedStrings = (strings: string[]) => {
  const hashedStrs = useRef<Record<string, string>>(hashStrings(strings));

  useEffect(() => {
    hashedStrs.current = hashStrings(strings);
  }, [strings, hashedStrs]);

  return hashedStrs.current;
};
