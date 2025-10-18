import styled from "styled-components";
import React, {useRef} from "react";
import {useCanvasInteraction} from "@/features/canvas/hooks/useCanvasInteraction";
import {useCanvasRenderer} from "@/features/canvas/hooks/useCanvasRenderer";
import {CanvasSize, Screen} from "@/features/canvas/constants/canvas-constants";

interface CanvasProps {
	screens: Screen[];
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
	setScreens: React.Dispatch<React.SetStateAction<Screen[]>>;
	canvasSize: CanvasSize;
}

export const LiveCanvas = ({canvasRef, screens, setScreens, canvasSize}: CanvasProps) => {

	// const audioManager = useAudioManager();
	const { cursorStyle, handleMouseDown, handleMouseMove, handleMouseUp } = useCanvasInteraction(screens, setScreens, canvasSize);
	
	useCanvasRenderer(canvasRef, screens, canvasSize);
	
	return (
		<VideoCanvas
			ref={canvasRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			cursorStyle={cursorStyle}
		/>
	)
}

const VideoCanvas = styled.canvas<{ cursorStyle: string }>`
  cursor: ${props => props.cursorStyle};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.light};
  border: ${({theme}) => `2px solid ${theme.colors.border.normal}`};
  border-radius: ${({theme}) => theme.borders.small};
  position: relative;
  aspect-ratio: 16 / 9;
  min-height: 200px;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 150px;
  }
`;