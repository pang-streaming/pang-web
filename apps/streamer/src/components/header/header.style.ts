import styled from "styled-components";

export const BaseHeader = styled.div`
    width: 100%;
    height: 72px;
    background-color: #1a1a1a;
    border-bottom: 1px solid #2a2a2a;
    display: flex;
    align-items: center;
    padding: 0 25px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
`;

export const HeaderLogoContainer = styled.div<{ className?: string }>`
    height: 100%;
    display: flex;
    align-items: center;
    img {
        height: 32px;
    }
`;
