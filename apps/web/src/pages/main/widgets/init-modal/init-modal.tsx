import styled from "styled-components";
import { useState } from "react";
import { InitModalStep1 } from "./init-modal-step1";
import { InitModalStep2 } from "./init-modal-step2";

interface InitModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; 
}

export const InitModal = ({ isOpen, onClose }: InitModalProps) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleNext = () => setStep((prev) => prev + 1);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {step === 1 && <InitModalStep1 />}
        {step === 2 && <InitModalStep2 />}

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
  background: ${({ active }) => (active ? "#FF0055" : "#525252")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 108px;
`;

// 공통 스타일로 재활용 가능한 버튼들
const CloseButton = styled.button`
  width: 100%;
  height: 53px;
  background: #ff0055;
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
  background: #ff0055;

  &:hover {
    background: #c70039;
  }
`;