import React, { ChangeEventHandler, InputHTMLAttributes } from "react";
import styled from "styled-components";



interface IMessageFieldProps {
  onMessageChange: (url: string) => void;
}

export const MessageField = ({ onMessageChange }: IMessageFieldProps) => {
  const handleOnChangeText = (e: React.ChangeEvent<HTMLTextAreaElement >) => {
    onMessageChange(e.target.value)
  }
  return (
    <MessageFieldContainer onChange={handleOnChangeText}/>
  );
};

const MessageFieldContainer = styled.textarea`
  height: 50px;
  padding: 10px;
  background-color: ${({theme})=>theme.colors.content.normal};
  color: white;
  outline: none;
  border: 0;
  border-radius: 5px;
`