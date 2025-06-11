import styled from "styled-components";


export const AgeSection = () => {
    return (
        <AgeInputWrapper 
        placeholder="생년월일을 입력해주세요 (ex. YYYY-MM-DD)"
        />
    );
}

export const AgeInputWrapper = styled.input`
    width: 100%;
    height: 16px;
    color: #a3a3a3;
    background-color: transparent;
    font-size: 12px;
    font-weight: 400;
    outline: none;
    border: none;
`