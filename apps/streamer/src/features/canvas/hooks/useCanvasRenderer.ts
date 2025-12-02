import {CanvasSize, HANDLE_SIZE, Screen} from "@/features/canvas/constants/canvas-constants";
import {useSelectedScreenStore} from "@/features/stores/useSelectedScreenStore";
import {RefObject, useEffect} from "react";
import {useTheme} from "styled-components";

export const useCanvasRenderer = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	screens: Screen[],
	canvasSize: CanvasSize
): void => {
	const { selectedScreen } = useSelectedScreenStore();
	const theme = useTheme();
	
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const dpr = 1;
		canvas.width = canvasSize.width * dpr;
		canvas.height = canvasSize.height * dpr;
		
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
			ctx.fillStyle = theme.colors.background.dark;
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
					ctx.strokeStyle = theme.colors.primary;
					ctx.lineWidth = 2;
					ctx.strokeRect(screen.x, screen.y, screen.width, screen.height);

					const corners: [number, number][] = [
						[screen.x, screen.y],
						[screen.x + screen.width - HANDLE_SIZE, screen.y],
						[screen.x, screen.y + screen.height - HANDLE_SIZE],
						[screen.x + screen.width - HANDLE_SIZE, screen.y + screen.height - HANDLE_SIZE]
					];

					corners.forEach(([cx, cy]) => {
						ctx.fillStyle = theme.colors.primary;
						ctx.fillRect(cx, cy, HANDLE_SIZE, HANDLE_SIZE);
						ctx.fillStyle = theme.colors.background.normal;
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
	}, [canvasRef, canvasSize.height, canvasSize.width, screens, selectedScreen, theme]);
};