import { useRef } from "react";

// cf. https://www.benmvp.com/blog/8-helpful-custom-react-hooks/#code-classlanguage-textuseinitialmountcode
export const useInitialRender = () => {
  const isInitial = useRef(true);

  if (isInitial.current) {
    isInitial.current = false;
    return true;
  }

  return false;
};
