import React, { ChangeEventHandler, InputHTMLAttributes } from "react";
import styled from "styled-components";



interface IYoutubeFieldProps {
  onYoutubeUrlChange: (url: string) => void;
}

export const YoutubeField = ({ onYoutubeUrlChange }: IYoutubeFieldProps) => {
  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement >) => {
    onYoutubeUrlChange(e.target.value)
  }
  return (
    <Container>
      <Text>
        유튜브 링크
      </Text>
      <YoutubeInput onChange={handleOnChangeText} placeholder="URL를 입력해주세요"/>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 114px;
  border-radius: ${({ theme }) => theme.borders.large};
  background-color: transparent;
  justify-content: space-between;
  border: 1px solid #262626;
  
`;

const Text = styled.span`
  font-size: ${({theme}) => theme.font.large};
  font-weight: 600;
  color: ${({theme}) => theme.colors.text.subtitle};
`;

const YoutubeInput = styled.input`
  height: 40px;
  padding-left: 10px;
  background-color: ${({theme})=>theme.colors.content.normal};
  color: white;
  outline: none;
  border: 0;
  border-radius: 5px;
  
`