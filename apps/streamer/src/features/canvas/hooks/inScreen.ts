import { Screen } from "@/features/canvas/constants/canvas-constants"
export const isInScreen = (x: number, y: number, screen: Screen): boolean => {
	return x >= screen.x && x <= screen.x + screen.width &&
		y >= screen.y && y <= screen.y + screen.height;
};