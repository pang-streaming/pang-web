import { createGlobalStyle } from "styled-components";



export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    background-color: #000;
    color: #fff;
  }

  a {
    text-decoration: none;
    color: inherit;
  }


  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  span {
    user-select: none;
  }
`;
