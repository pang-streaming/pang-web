import styled from "styled-components";

export const BaseHeader = styled.div`
    color: #fff;
    display: flex;
    align-items: center;
    padding: 25px;
    background-color: ${(props)=> props.theme.netural900};
    border-bottom: 1px solid ${(props)=>props.theme.gray700};
    overscroll-behavior: none;
    display: flex;
    justify-content: flex-end;
`;