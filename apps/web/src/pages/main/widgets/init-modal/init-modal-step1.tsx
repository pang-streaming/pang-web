// InitModalStep1.tsx
import styled from "styled-components";
import { ModalSection } from "../modal-section/modal-section";

interface InitModalStep1Props {
  onNext: () => void;
}

export const InitModalStep1 = ({ onNext }: InitModalStep1Props) => {
  const userid = localStorage.getItem("userid") || "사용자";

  return (
    <Container>
      <Title>
        {userid}님의
        <br />
        나이와 성별을 입력해주세요
      </Title>
      <ModalSection />
      <ModalSection />
      <NextButton onClick={onNext}>다음</NextButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  width: 100%;
  font-size: 24px;
  font-weight: 800;
  text-align: left;
`;

const NextButton = styled.button`
  margin-top: 20px;
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
    background: #c70039;
  }
`;