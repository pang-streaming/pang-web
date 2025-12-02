import styled from "styled-components";
import React, { useEffect } from "react";
import { useCanvasInteraction } from "@/features/canvas/hooks/useCanvasInteraction";
import { useCanvasRenderer } from "@/features/canvas/hooks/useCanvasRenderer";
import {
  CanvasSize,
  Screen,
} from "@/features/canvas/constants/canvas-constants";
import { useSelectedScreenStore } from "@/features/stores/useSelectedScreenStore";

interface CanvasProps {
  screens: Screen[];
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  setScreens: React.Dispatch<React.SetStateAction<Screen[]>>;
  canvasSize: CanvasSize;
}

export const LiveCanvas = ({
  canvasRef,
  screens,
  setScreens,
  canvasSize,
}: CanvasProps) => {
  const { cursorStyle, handleMouseDown, handleMouseMove, handleMouseUp } =
    useCanvasInteraction(screens, setScreens, canvasSize);
  const { setSelectedScreen } = useSelectedScreenStore();

  useCanvasRenderer(canvasRef, screens, canvasSize);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (canvas && !canvas.contains(event.target as Node)) {
        setSelectedScreen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [canvasRef, setSelectedScreen]);

  return (
    <VideoCanvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      cursorStyle={cursorStyle}
    />
  );
};

const VideoCanvas = styled.canvas<{ cursorStyle: string }>`
  cursor: ${(props) => props.cursorStyle};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.light};
  border: ${({ theme }) => `2px solid ${theme.colors.border.normal}`};
  border-radius: ${({ theme }) => theme.borders.small};
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`;
