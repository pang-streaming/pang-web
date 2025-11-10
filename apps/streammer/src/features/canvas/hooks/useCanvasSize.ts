import {CanvasSize} from "@/features/canvas/constants/canvas-constants";
import {useState} from "react";

export const useCanvasSize = (): CanvasSize => {
	// 스트리밍 해상도를 1920x1080으로 고정
	// 실제 화면 표시 크기는 CSS로 조절되지만, 내부 좌표계와 스트리밍은 항상 1920x1080
	const [canvasSize] = useState<CanvasSize>({ width: 2560, height: 1440 });
	
	return canvasSize;
};