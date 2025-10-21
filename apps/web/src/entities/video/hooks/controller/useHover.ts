import { useCallback, useEffect, useRef, useState } from "react";

export const useHover = <T extends HTMLElement>() => {
  const [state, setState] = useState(false);
  const ref = useRef<T | null>(null);

  const handleMouseEnter = useCallback(() => setState(true), []);
  const handleMouseLeave = useCallback(() => setState(false), []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.addEventListener("mouseenter", handleMouseEnter);
        ref.current.addEventListener("mouseleave", handleMouseLeave);
        clearInterval(interval); 
      }
    }, 100);
    return () => {
      clearInterval(interval);
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", handleMouseEnter);
        ref.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);
  

  return [ref, state] as const;
};