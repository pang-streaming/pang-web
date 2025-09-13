import { useState } from "react";
import styled from "styled-components";
import Emoji from "@/app/assets/emoji.svg?react";
import Airplane from "@/app/assets/airplane.svg?react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  const [isComposing, setIsComposing] = useState(false); 

  const inputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const compositionStart = () => {
    setIsComposing(true);
  };

  const compositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="채팅을 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={inputEnter}
        onCompositionStart={compositionStart}
        onCompositionEnd={compositionEnd}
      />
      <Emoji />
      <Airplane onClick={handleSend} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: ${({theme}) => theme.colors.content.normal};
  border-radius: ${({theme}) => theme.borders.large};
  display: flex;
  align-items: center;
  padding: 12px;
  box-sizing: border-box;
  color: ${({theme}) => theme.colors.text.normal};
  justify-content: space-between;
`;
export const Input = styled.input`
  outline: none;
  border: none;
  width: 80%;
  background-color: transparent;
  color: ${({theme}) => theme.colors.text.normal};
`;