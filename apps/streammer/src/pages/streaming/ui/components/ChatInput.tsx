import { useState } from "react";
import styled from "styled-components";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

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
      <EmojiButton>
        <EmojiIcon />
      </EmojiButton>
      <SendButton onClick={handleSend}>
        <SendIcon />
      </SendButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 46px;
  border-top: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 80%;
  background-color: transparent;
  border-radius: 8px;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.common.white};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }
`;

const EmojiButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const EmojiIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16'/%3E%3Cpath d='M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25a.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const SendButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
`;

const SendIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
