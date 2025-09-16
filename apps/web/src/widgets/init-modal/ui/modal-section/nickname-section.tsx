import React from "react";
import styled from "styled-components";

export const NicknameSection = ({
  nickname,
  setNickname,
}: {
  nickname: string;
  setNickname: (value: string) => void;
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = e.target.value
        setNickname(onlyNumbers);
      };
  return (
    <AgeInputWrapper
      value={nickname}
      onChange={handleChange}
      maxLength={8}
      placeholder="닉네임을 입력해주세요"
    />
  );
};

export const AgeInputWrapper = styled.input`
  width: 100%;
  height: 16px;
  color: #a3a3a3;
  background-color: transparent;
  font-size: 12px;
  font-weight: 400;
  outline: none;
  border: none;
`;
