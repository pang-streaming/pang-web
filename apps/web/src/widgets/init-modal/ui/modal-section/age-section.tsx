
import styled from "styled-components";

export const AgeSection = ({
  birth,
  setBirth, 
}: {
  birth: string;
  setBirth: (value: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setBirth(onlyNumbers);
  };

  return (
    <AgeInputWrapper
      value={birth}
      onChange={handleChange}
      maxLength={8}
      placeholder="생년월일을 입력해주세요 (ex. 20080708)"
    />
  );
};

export const formatBirthToDate = (birth: string) => {
  if (birth.length !== 8) return ""; 
  return `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`;
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
