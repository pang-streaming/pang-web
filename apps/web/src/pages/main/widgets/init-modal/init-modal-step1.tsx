// InitModalStep1.tsx
import styled from "styled-components";
import { ModalSection } from "../modal-section/modal-section";

export const InitModalStep1 = () => {
  const userid = localStorage.getItem("userid") || "사용자";

  return (
    <Container>
      <Title>
        {userid}님의
        <br />
        나이와 성별을 선택해주세요
      </Title>
      <ModalSectionContainer>
        <ModalSection isAge={true}/>
        <ModalSection isAge={false}/>
      </ModalSectionContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  width: 100%;
  font-size: 24px;
  font-weight: 800;
  text-align: left;
`;

const ModalSectionContainer = styled.div`
  width: 100%;
  height: 114px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
