
import styled from "styled-components";
import { useState } from "react";
import { formatBirthToDate } from "./ui/modal-section/age-section";
import { InitModalStep1 } from "./first-modal";
import { InitModalStep2 } from "./second-modal";
import { updateMyInfo } from "@/entities/user/api/api";

interface InitModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  username?: string;
}

export const InitModal = ({ isOpen, onClose, username }: InitModalProps) => {
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER" | "">("");
  const [nickname, setNickname] = useState("");

  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleNext = async () => {
    if (!birth || !gender || !nickname) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    const formattedBirth = formatBirthToDate(birth);

    if (!formattedBirth) {
      alert("생년월일을 8자리로 정확히 입력해주세요!");
      return;
    }
    console.log("요청 보낼 생년월일:", formattedBirth); 

    try {
      await updateMyInfo(nickname, formattedBirth, gender);
      setStep((prev) => prev + 1);
    } catch (err) {
      console.error("업데이트 실패:", err);
      alert("정보 업데이트 실패");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {step === 1 && (
          <InitModalStep1
            username={username}
            birth={birth}
            setBirth={setBirth}
            gender={gender}
            setGender={setGender}
            nickname={nickname}
            setNickname={setNickname}
          />
        )}
        {step === 2 && <InitModalStep2 username={username} />}

        <ButtonWrapper>
          {step === 1 ? (
            <NextButton onClick={handleNext}>다음</NextButton>
          ) : (
            <CloseButton onClick={onClose}>완료</CloseButton>
          )}
        </ButtonWrapper>

        <StepIndicator>
          <Circle active={step === 1}></Circle>
          <Circle active={step === 2}></Circle>
        </StepIndicator>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #171717;
  box-sizing: border-box;
  padding: 94px 71px;
  border-radius: 14px;
  width: 490px;
  height: 590px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 21px;
`;

const Circle = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active, theme }) => (active ? theme.colors.primary.normal : "#525252")};
  color: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 108px;
`;

const CloseButton = styled.button`
  width: 100%;
  height: 53px;
  background: ${({theme}) => theme.colors.primary.normal};
  border: none;
  outline: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;

  &:hover {
    background: #c4c4c4;
  }
`;

const NextButton = styled(CloseButton)`
  background: ${({theme}) => theme.colors.primary.normal};

  &:hover {
    background: #c70039;
  }
`;
