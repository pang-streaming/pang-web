import { useState } from "react";
import styled from "styled-components";

export const GenderPicker = ({
  gender,
  setGender,
}: {
  gender: string;
  setGender: (value: "MALE" | "FEMALE" | "OTHER") => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDisplayText = () => {
    if (gender === "MALE") return "남성";
    if (gender === "FEMALE") return "여성";
    if (gender === "OTHER") return "기타";
    return "성별을 선택해주세요";
  };

  return (
    <GenderDropdownWrapper>
      <GenderSelectButton onClick={() => setIsOpen(!isOpen)}>
        {getDisplayText()}
      </GenderSelectButton>

      {isOpen && (
        <GenderOptionBox>
          <GenderOption
            onClick={() => {
              setGender("MALE");
              setIsOpen(false);
            }}
          >
            남성
          </GenderOption>
          <GenderOption
            onClick={() => {
              setGender("FEMALE");
              setIsOpen(false);
            }}
          >
            여성
          </GenderOption>
          <GenderOption
            onClick={() => {
              setGender("OTHER");
              setIsOpen(false);
            }}
          >
            기타
          </GenderOption>
        </GenderOptionBox>
      )}
    </GenderDropdownWrapper>
  );
};

const GenderDropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const GenderSelectButton = styled.button`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: #a3a3a3;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: 400;
  border-radius: 8px;
  cursor: pointer;
`;

const GenderOptionBox = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background-color: #262626;
  border-radius: 8px;
  margin-top: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const GenderOption = styled.div`
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #373737;
    border-radius: 8px;
  }
`;
