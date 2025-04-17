import styled from "styled-components"

export const SearchView = styled.div`
    height: 40px;
    width: 30%;
    width: 450px;
    position: absolute;
    transform: translate(-50%);
    left: 50%;
    
    background-color: #262626;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:20px;
    padding: 15px;
    padding-top: 0;
    padding-bottom: 0;
`

export const SearchInput = styled.input`
    width: 100%;
    height: 45px;
    background: none;
    outline: none;
    border: 0;
    color: white;    
    font-size: 14px;
`