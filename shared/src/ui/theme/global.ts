import {createGlobalStyle} from "styled-components";
import "../../asset/fonts/WantedSans/WantedSans.css";

export const GlobalStyle = createGlobalStyle`
	body {
		font-family: Wanted Sans,sans-serif;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		background-color: ${({theme}) => theme.colors.background.normal};
		//font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		line-height: 1.2;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	input, button, textarea, select {
		font-family: inherit;
	}
`;