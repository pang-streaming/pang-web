import {ASPECT_RATIO, CanvasSize} from "@/features/canvas/constants/canvas-constants";
import {RefObject, useEffect, useRef, useState} from "react";

export const useCanvasSize = (containerRef: RefObject<HTMLDivElement | null>): CanvasSize => {
	const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 1920, height: 1080 });
	const lastSizeRef = useRef<CanvasSize>({ width: 0, height: 0 });

	useEffect(() => {
		const updateCanvasSize = (): void => {
			if (!containerRef.current) return;

			const containerWidth = containerRef.current.clientWidth;
			const containerHeight = containerRef.current.clientHeight;

			let width: number, height: number;
			if (containerWidth / containerHeight > ASPECT_RATIO) {
				height = containerHeight * 0.95;
				width = height * ASPECT_RATIO;
			} else {
				width = containerWidth * 0.95;
				height = width / ASPECT_RATIO;
			}

			// 크기가 실제로 변경되었을 때만 상태 업데이트
			const newSize = { width, height };
			if (lastSizeRef.current.width !== newSize.width || lastSizeRef.current.height !== newSize.height) {
				lastSizeRef.current = newSize;
				setCanvasSize(newSize);
			}
		};

		updateCanvasSize();

		// Resize 이벤트에 throttling 적용
		let timeoutId: NodeJS.Timeout;
		const throttledResize = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(updateCanvasSize, 16);
		};

		window.addEventListener('resize', throttledResize);
		return () => {
			window.removeEventListener('resize', throttledResize);
			clearTimeout(timeoutId);
		};
	}, [containerRef]);
	
	return canvasSize;
};