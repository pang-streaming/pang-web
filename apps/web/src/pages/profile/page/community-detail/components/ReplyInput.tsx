import React from "react";
import { IoSend } from "react-icons/io5";
import * as S from "../style";

interface ReplyInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onCancel: () => void;
  placeholder: string;
  disabled: boolean;
}

export const ReplyInput = ({
  value,
  onChange,
  onSend,
  onCancel,
  placeholder,
  disabled,
}: ReplyInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <S.ReplyInputWrapper>
      <S.CommentInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
      />
      <S.ReplyButtonGroup>
        <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
        <S.SendButton onClick={onSend} disabled={!value.trim() || disabled}>
          <IoSend size={20} />
        </S.SendButton>
      </S.ReplyButtonGroup>
    </S.ReplyInputWrapper>
  );
};

