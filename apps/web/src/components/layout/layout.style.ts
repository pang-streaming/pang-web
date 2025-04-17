import styled, { createGlobalStyle } from "styled-components";
import { ClippedSidebar } from "./layout.props";

export const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden;
    overscroll-behavior: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: ${(props)=> props.theme.netural900};
  }
  * {
    user-select: none;
    -webkit-user-drag: none;
  }
  ol, ul{
    list-style: none;
  }
`;

export const Container = styled.div<ClippedSidebar>`
    display: grid;
    grid-template-columns: ${({ isClipped }) => isClipped ? 80 : 240}px 1fr;
    grid-template-rows: 65px 1fr;
    height: 100vh;
    overflow: hidden;
    overscroll-behavior: none;
`;

export const Content = styled.div`
    overflow: auto;
    display: flex;
`;