import { DefaultTheme } from "styled-components";
import {Colors, darkColors, lightColors} from "./colors";
import {breakpoints, Breakpoints} from "./breakpoints";
import {fontSizes, FontSizes} from "./font";
import {shadows, Shadows} from "./shadows";
import {borders, Borders} from "./borders";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: Colors;
		breakpoint: Breakpoints;
		font: FontSizes;
		shadows: Shadows;
		borders: Borders;
	}
}

export const lightTheme: DefaultTheme = {
	colors: lightColors,
	breakpoint: breakpoints,
	font: fontSizes,
	shadows: shadows,
	borders: borders
}

export const darkTheme: DefaultTheme = {
	colors: darkColors,
	breakpoint: breakpoints,
	font: fontSizes,
	shadows: shadows,
	borders: borders
}

// 	primary500: "#ff0055ff",
// 	primary400: "#ff3377ff",
// 	primary300: "#ff6699ff",
// 	primary200: "#ff99bbff",
// 	primary100: "#ffccddff",
// 	primary50: "#ffe5eeff",
// 	primary10: "#fffafcff",
// 	primary600: "#cc0044ff",
// 	primary700: "#990033ff",
// 	primary800: "#660022ff",
// 	primaryTextColor: "#FFFFFF",
//
// 	secondary500: "#6600ffff",
// 	secondary10: "#fcfaffff",
// 	secondary50: "#f0e5ffff",
// 	secondary100: "#e0ccffff",
// 	secondary200: "#c299ffff",
// 	secondary300: "#a366ffff",
// 	secondary400: "#8533ffff",
// 	secondary600: "#5200ccff",
// 	secondary700: "#3d0099ff",
// 	secondary800: "#290066ff",
// 	secondary900: "#140033ff",
// 	netural800:"#262626ff",
// 	gray700:"#374151ff",
// 	color: "#ff0055ff"
