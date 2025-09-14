import { useCallback, useEffect, useRef } from "react";

type UseSliderProps = {
  onChange: (v: number) => void;
  min?: number;
  max?: number;
};

export const useSlider = ({ onChange, min = 0, max = 100 }: UseSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleValueChange = useCallback(
    (clientX: number) => {
      const sliderElement = sliderRef.current;
      if (!sliderElement) return;

      const sliderRect = sliderElement.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      const posX = clientX - sliderRect.left;

      let newValue = Math.round((posX / sliderWidth) * (max - min) + min);
      newValue = Math.max(min, Math.min(max, newValue));
      
      onChange(newValue);
    },
    [onChange, min, max]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    handleValueChange(e.clientX);
  }, [handleValueChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDraggingRef.current) {
      handleValueChange(e.clientX);
    }
  }, [handleValueChange]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { sliderRef, handleMouseDown };
};
