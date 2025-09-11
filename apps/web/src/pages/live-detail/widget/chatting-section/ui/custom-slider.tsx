import { useCallback, useEffect, useRef } from "react";

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export const CustomSlider = ({ value, onChange }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const min = 0;
  const max = 100;

  const calculateValue = useCallback(
    (clientX: number) => {
      const sliderRect = sliderRef.current?.getBoundingClientRect();
      if (!sliderRect) return;

      const posX = clientX - sliderRect.left;
      const sliderWidth = sliderRect.width;

      let value = Math.round((posX / sliderWidth) * (max - min) + min);
      value = Math.max(min, Math.min(max, value));
      onChange(value);
    },
    [onChange]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    calculateValue(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingRef.current) {
      calculateValue(e.clientX);
    }
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "relative",
        width: "100px",
        height: "6px",
        backgroundColor: "#888",
        borderRadius: "4px",
        cursor: "pointer",
        marginLeft: "10px",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: `${((value - min) / (max - min)) * 100}%`,
          backgroundColor: "white",
          borderRadius: "4px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${((value - min) / (max - min)) * 100}%`,
          top: "-3px",
          width: "12px",
          height: "12px",
          backgroundColor: "white",
          borderRadius: "50%",
          transform: "translate(-50%, 0)",
          cursor: "pointer",
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};
