// ui/chat-input.tsx
import { useState } from "react";
import styled from "styled-components";
import emoji from "../../../../../app/assets/emoji.svg";
import airplane from "../../../../../app/assets/airplane.svg";

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
        placeholder="채팅창 문구"
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
  height: 46px;
  border-top: 1px solid #404040;
  background-color: #111;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 12px;
`;
export const Input = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  border-radius: 8px;
  margin-right: auto;
  color: #fff;
`;

export const Emoji = styled.img.attrs({
  src: emoji,
  alt: "이모지",
})`
  cursor: pointer;
`;

export const Airplane = styled.img.attrs({
  src: airplane,
  alt: "보내기",
})`
  cursor: pointer;
  margin-left: 8px;
`;
