import React from "react";
import { ThemeProvider } from "styled-components";
import {darkTheme, lightTheme} from "../theme";
import {useThemeStore} from "../../store/theme/themeStore";

export const CustomThemeProvider = ({children}: {children: React.ReactNode}) => {
	const {mode} = useThemeStore()
	const theme = mode === 'dark' ? darkTheme : lightTheme
	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	)
};