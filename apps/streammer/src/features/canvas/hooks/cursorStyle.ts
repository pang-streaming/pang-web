import {Corner, Edge, ResizeArea, ResizeType} from "@/features/canvas/constants/canvas-constants";

export const getCursorStyle = (area: ResizeArea | null): string => {
	if (!area) return 'default';
	
	if (area.type === ResizeType.CORNER) {
		return [Corner.TOP_LEFT, Corner.BOTTOM_RIGHT].includes(area.corner as any)
			? 'nwse-resize'
			: 'nesw-resize';
	}
	
	if (area.type === ResizeType.EDGE) {
		return [Edge.LEFT, Edge.RIGHT].includes(area.edge as any)
			? 'ew-resize'
			: 'ns-resize';
	}
	
	return 'default';
};