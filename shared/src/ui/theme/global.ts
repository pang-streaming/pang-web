import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
	body {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		background-color: ${({theme}) => theme.colors.background.normal};
	}
`;