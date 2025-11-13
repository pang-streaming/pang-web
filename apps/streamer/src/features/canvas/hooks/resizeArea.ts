import {
	Corner,
	Edge,
	EDGE_WIDTH,
	HANDLE_SIZE,
	ResizeArea,
	Screen,
	ResizeType
} from "@/features/canvas/constants/canvas-constants";

export const getResizeArea = (x: number, y: number, screen: Screen): ResizeArea | null => {
	const { x: sx, y: sy, width: sw, height: sh } = screen;
	
	const corners = [
		{ x: sx + sw - HANDLE_SIZE, y: sy + sh - HANDLE_SIZE, corner: Corner.BOTTOM_RIGHT },
		{ x: sx + sw - HANDLE_SIZE, y: sy, corner: Corner.TOP_RIGHT },
		{ x: sx, y: sy + sh - HANDLE_SIZE, corner: Corner.BOTTOM_LEFT },
		{ x: sx, y: sy, corner: Corner.TOP_LEFT }
	];
	
	for (const { x: cx, y: cy, corner } of corners) {
		if (x >= cx && x <= cx + HANDLE_SIZE && y >= cy && y <= cy + HANDLE_SIZE) {
			return { type: ResizeType.CORNER, corner };
		}
	}
	
	if (x >= sx + sw - EDGE_WIDTH && x <= sx + sw && y > sy + HANDLE_SIZE && y < sy + sh - HANDLE_SIZE) {
		return { type: ResizeType.EDGE, edge: Edge.RIGHT };
	}
	if (x >= sx && x <= sx + EDGE_WIDTH && y > sy + HANDLE_SIZE && y < sy + sh - HANDLE_SIZE) {
		return { type: ResizeType.EDGE, edge: Edge.LEFT };
	}
	if (y >= sy + sh - EDGE_WIDTH && y <= sy + sh && x > sx + HANDLE_SIZE && x < sx + sw - HANDLE_SIZE) {
		return { type: ResizeType.EDGE, edge: Edge.BOTTOM };
	}
	if (y >= sy && y <= sy + EDGE_WIDTH && x > sx + HANDLE_SIZE && x < sx + sw - HANDLE_SIZE) {
		return { type: ResizeType.EDGE, edge: Edge.TOP };
	}
	
	return null;
};