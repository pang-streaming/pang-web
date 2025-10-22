import {
	CanvasSize,
	Corner, Edge, MIN_HEIGHT, MIN_WIDTH,
	MousePosition,
	Offset,
	ResizeArea,
	Screen,
	ResizeType
} from "@/features/canvas/constants/canvas-constants";
import React, {Dispatch, SetStateAction, useCallback, useRef, useState} from "react";
import {useSelectedScreenStore} from "@/features/stores/useSelectedScreenStore";
import {getResizeArea} from "@/features/canvas/hooks/resizeArea";
import {isInScreen} from "@/features/canvas/hooks/inScreen";
import {getCursorStyle} from "@/features/canvas/hooks/cursorStyle";

interface CanvasInteraction {
	cursorStyle: string;
	handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
	handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
	handleMouseUp: () => void;
}

export const useCanvasInteraction = (
	screens: Screen[],
	setScreens: Dispatch<SetStateAction<Screen[]>>,
	canvasSize: CanvasSize
): CanvasInteraction => {
	const { setSelectedScreen } = useSelectedScreenStore();
	const [selected, setSelected] = useState<Screen | null>(null);
	const [resizing, setResizing] = useState<Screen | null>(null);
	const [resizeMode, setResizeMode] = useState<ResizeArea | null>(null);
	const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
	const [cursorStyle, setCursorStyle] = useState<string>('default');
	const originalAspectRatioRef = useRef<number>(1);
	
	const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement>): MousePosition => {
		const canvas = e.target as HTMLCanvasElement;
		const rect = canvas.getBoundingClientRect();
		// 화면 표시 크기에서 실제 캔버스 해상도(1920x1080)로 좌표 변환
		const scaleX = 1920 / rect.width;
		const scaleY = 1080 / rect.height;
		return {
			x: (e.clientX - rect.left) * scaleX,
			y: (e.clientY - rect.top) * scaleY
		};
	}, []);
	
	const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>): void => {
		const pos = getMousePos(e);
		let selected = false;
		// Check for resize areas
		for (let i = screens.length - 1; i >= 0; i--) {
			const screen = screens[i];
			const area = getResizeArea(pos.x, pos.y, screen);
			
			if (area) {
				setSelectedScreen(screen.id)
				selected = true;
				setResizing(screen);
				setResizeMode(area);
				originalAspectRatioRef.current = screen.width / screen.height;
				setOffset({
					x: pos.x,
					y: pos.y,
					startX: screen.x,
					startY: screen.y,
					startWidth: screen.width,
					startHeight: screen.height
				});
				return;
			}
		}
		
		// Check for drag
		for (let i = screens.length - 1; i >= 0; i--) {
			const screen = screens[i];
			if (isInScreen(pos.x, pos.y, screen)) {
				setSelectedScreen(screen.id)
				selected = true;
				setSelected(screen);
				setOffset({
					x: pos.x - screen.x,
					y: pos.y - screen.y
				});
				return;
			}
		}
		
		if (!selected) setSelectedScreen(null);
	}, [getMousePos, setSelectedScreen, screens]);
	
	const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLCanvasElement>): void => {
		const pos = getMousePos(e);
		
		if (resizing && resizeMode) {
			const dx = pos.x - offset.x;
			const dy = pos.y - offset.y;
			
			setScreens(prev => prev.map(s => {
				if (s.id !== resizing.id) return s;
				
				const updates: Partial<Screen> = {};
				
				if (resizeMode.type === ResizeType.CORNER) {
					const originalAR = originalAspectRatioRef.current;
					let maxDelta: number, newWidth: number, newHeight: number;
					
					switch (resizeMode.corner) {
						case Corner.BOTTOM_RIGHT:
							maxDelta = Math.max(dx / originalAR, dy);
							newWidth = offset.startWidth! + maxDelta * originalAR;
							newHeight = offset.startHeight! + maxDelta;
							break;
						case Corner.BOTTOM_LEFT:
							maxDelta = Math.max(-dx / originalAR, dy);
							newWidth = offset.startWidth! + maxDelta * originalAR;
							newHeight = offset.startHeight! + maxDelta;
							updates.x = offset.startX! - maxDelta * originalAR;
							break;
						case Corner.TOP_RIGHT:
							maxDelta = Math.max(dx / originalAR, -dy);
							newWidth = offset.startWidth! + maxDelta * originalAR;
							newHeight = offset.startHeight! + maxDelta;
							updates.y = offset.startY! - maxDelta;
							break;
						case Corner.TOP_LEFT:
							maxDelta = Math.max(-dx / originalAR, -dy);
							newWidth = offset.startWidth! + maxDelta * originalAR;
							newHeight = offset.startHeight! + maxDelta;
							updates.x = offset.startX! - maxDelta * originalAR;
							updates.y = offset.startY! - maxDelta;
							break;
						default:
							newWidth = offset.startWidth!;
							newHeight = offset.startHeight!;
					}
					
					updates.width = Math.max(MIN_WIDTH, newWidth);
					updates.height = Math.max(MIN_HEIGHT, newHeight);
					
				} else if (resizeMode.type === ResizeType.EDGE) {
					let newWidth: number, newHeight: number;
					
					switch (resizeMode.edge) {
						case Edge.RIGHT:
							updates.width = Math.max(MIN_WIDTH, offset.startWidth! + dx);
							break;
						case Edge.LEFT:
							newWidth = Math.max(MIN_WIDTH, offset.startWidth! - dx);
							updates.x = offset.startX! + (offset.startWidth! - newWidth);
							updates.width = newWidth;
							break;
						case Edge.BOTTOM:
							updates.height = Math.max(MIN_HEIGHT, offset.startHeight! + dy);
							break;
						case Edge.TOP:
							newHeight = Math.max(MIN_HEIGHT, offset.startHeight! - dy);
							updates.y = offset.startY! + (offset.startHeight! - newHeight);
							updates.height = newHeight;
							break;
					}
				}
				
				return { ...s, ...updates };
			}));
			
		} else if (selected) {
			setScreens(prev => prev.map(s => {
				if (s.id !== selected.id) return s;
				return {
					...s,
					x: Math.max(0, Math.min(canvasSize.width - s.width, pos.x - offset.x)),
					y: Math.max(0, Math.min(canvasSize.height - s.height, pos.y - offset.y))
				};
			}));
		} else {
			// Update cursor
			let newCursor = 'default';
			for (let i = screens.length - 1; i >= 0; i--) {
				const area = getResizeArea(pos.x, pos.y, screens[i]);
				if (area) {
					newCursor = getCursorStyle(area);
					break;
				} else if (isInScreen(pos.x, pos.y, screens[i])) {
					newCursor = 'move';
					break;
				}
			}
			setCursorStyle(newCursor);
		}
	}, [resizing, resizeMode, selected, offset, screens, getMousePos, canvasSize, setScreens]);
	
	const handleMouseUp = React.useCallback((): void => {
		setSelected(null);
		setResizing(null);
		setResizeMode(null);
	}, []);
	
	return {
		cursorStyle,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp
	};
};