import {createGlobalStyle} from "styled-components";
import "../../asset/fonts/WantedSans/WantedSans.css";

export const GlobalStyle = createGlobalStyle`
	html {
		scrollbar-gutter: stable;
		background-color: ${({theme}) => theme.colors.background.normal};
	}

	body {
		font-family: Wanted Sans,sans-serif;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		line-height: 1.2;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	input, button, textarea, select {
		font-family: inherit;
	}
`;

export const GlobalStyleWithoutBackground = createGlobalStyle`
	html {
		scrollbar-gutter: stable;
	}

	body {
		font-family: Wanted Sans,sans-serif;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		line-height: 1.2;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	input, button, textarea, select {
		font-family: inherit;
	}
`;