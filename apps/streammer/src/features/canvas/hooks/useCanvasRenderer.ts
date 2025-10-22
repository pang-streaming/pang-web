import {CanvasSize, HANDLE_SIZE, Screen} from "@/features/canvas/constants/canvas-constants";
import {useSelectedScreenStore} from "@/features/stores/useSelectedScreenStore";
import {RefObject, useEffect} from "react";

export const useCanvasRenderer = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	screens: Screen[],
	canvasSize: CanvasSize
): void => {
	const { selectedScreen } = useSelectedScreenStore();
	
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		// 내부 해상도를 1.5배로 설정 (2880x1620) - 스트리밍 화질 향상
		const dpr = 1.5;
		canvas.width = canvasSize.width * dpr;
		canvas.height = canvasSize.height * dpr;
		// CSS 크기는 설정하지 않음 - styled-component의 aspect-ratio가 자동으로 반응형 처리
		
		const ctx = canvas.getContext('2d', {
			alpha: false,
			desynchronized: true
		});
		
		if (!ctx) return;
		
		ctx.scale(dpr, dpr);
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = 'high';
		
		let animationId: number;
		
		const drawLoop = (): void => {
			ctx.fillStyle = '#000000';
			ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
			
			screens.forEach(screen => {
				const { x, y, width, height, type, source } = screen;
				
				switch(type) {
					case 'video':
						if ((source as HTMLVideoElement).readyState >= 2) {
							ctx.drawImage(source as HTMLVideoElement, x, y, width, height);
						}
						break;
					case 'image':
						ctx.drawImage(source as HTMLImageElement, x, y, width, height);
						break;
					case 'canvas':
						ctx.drawImage(source as HTMLCanvasElement, x, y, width, height);
						break;
				}
				if (selectedScreen === screen.id) {
					ctx.strokeStyle = '#FF0055';
					ctx.lineWidth = 2;
					ctx.strokeRect(screen.x, screen.y, screen.width, screen.height);
					
					const corners: [number, number][] = [
						[screen.x, screen.y],
						[screen.x + screen.width - HANDLE_SIZE, screen.y],
						[screen.x, screen.y + screen.height - HANDLE_SIZE],
						[screen.x + screen.width - HANDLE_SIZE, screen.y + screen.height - HANDLE_SIZE]
					];
					
					corners.forEach(([cx, cy]) => {
						ctx.fillStyle = '#FF0055';
						ctx.fillRect(cx, cy, HANDLE_SIZE, HANDLE_SIZE);
						ctx.fillStyle = '#ffffff';
						ctx.fillRect(cx + 3, cy + 3, HANDLE_SIZE - 6, HANDLE_SIZE - 6);
					});
				}
			});
			
			animationId = requestAnimationFrame(drawLoop);
		};
		
		drawLoop();
		
		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, [canvasRef, canvasSize.height, canvasSize.width, screens, selectedScreen]);
};