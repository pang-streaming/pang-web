import React from "react";
import SegmentButton from "@/ui/buttons/segmentButton";
// import { ThemeProvider } from "styled-components";
// import {darkTheme, lightTheme} from "@/ui/theme";
// import {useThemeStore} from "@/store/theme/themeStore";

export const CustomThemeProvider = ({children}: {children: React.ReactNode}) => {
	// const {mode} = useThemeStore()
	// console.log(mode)
	// const theme = mode === 'dark' ? darkTheme : lightTheme
	return (
		<SegmentButton tabs={["asd", "ad"]} onClick={(tab) => console.log(tab)}/>
		// <ThemeProvider theme={theme}>
		// 	{children}
		// </ThemeProvider>
	)
};