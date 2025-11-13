export const ASPECT_RATIO: number = 16 / 9;
export const HANDLE_SIZE: number = 15;
export const EDGE_WIDTH: number = 8;
export const MIN_WIDTH: number = 100;
export const MIN_HEIGHT: number = 75;

export const ResizeType = {
	CORNER: 'corner',
	EDGE: 'edge'
} as const;

export const Corner = {
	TOP_LEFT: 'top-left',
	TOP_RIGHT: 'top-right',
	BOTTOM_LEFT: 'bottom-left',
	BOTTOM_RIGHT: 'bottom-right'
} as const;

export const Edge = {
	TOP: 'top',
	RIGHT: 'right',
	BOTTOM: 'bottom',
	LEFT: 'left'
} as const;

export interface CanvasSize {
	width: number;
	height: number;
}

export interface Section {
	id: number;
	name: string;
	screens: Screen[];
}

export interface Screen {
	id: number;
	type: 'video' | 'image' | 'canvas';
	source: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | HTMLIFrameElement;
	stream?: MediaStream;
	audioSource?: MediaStreamAudioSourceNode;
	gainNode?: GainNode;
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface Offset {
	x: number;
	y: number;
	startX?: number;
	startY?: number;
	startWidth?: number;
	startHeight?: number;
}

export interface ResizeArea {
	type: 'corner' | 'edge';
	corner?: string;
	edge?: string;
}

export interface MousePosition {
	x: number;
	y: number;
}