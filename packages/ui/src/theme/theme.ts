import { DefaultTheme } from "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        primary500: string;
        primary400: string;
        primary300: string;
        primary200: string;
        primary100: string;
        primary50: string;
        primary10: string;
        primary600: string;
        primary700: string;
        primary800: string;
        primaryTextColor: string;
        secondary500: string;
        secondary10: string;
        secondary50: string;
        secondary100: string;
        secondary200: string;
        secondary300: string;
        secondary400: string;
        secondary600: string;
        secondary700: string;
        secondary800: string;
        secondary900: string;
        netural800:string;
        gray700:string;
        color: string;
    }
}

export const theme: DefaultTheme = {
    primary500: "#ff0055ff",
    primary400: "#ff3377ff",
    primary300: "#ff6699ff",
    primary200: "#ff99bbff",
    primary100: "#ffccddff",
    primary50: "#ffe5eeff",
    primary10: "#fffafcff",
    primary600: "#cc0044ff",
    primary700: "#990033ff",
    primary800: "#660022ff",
    primaryTextColor: "#FFFFFF",
    
    secondary500: "#6600ffff",
    secondary10: "#fcfaffff",
    secondary50: "#f0e5ffff",
    secondary100: "#e0ccffff",
    secondary200: "#c299ffff",
    secondary300: "#a366ffff",
    secondary400: "#8533ffff",
    secondary600: "#5200ccff",
    secondary700: "#3d0099ff",
    secondary800: "#290066ff",
    secondary900: "#140033ff",
    netural800:"#262626ff",
    gray700:"#374151ff",
    color: "#ff0055ff"
};
