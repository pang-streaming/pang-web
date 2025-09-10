

import styled from "styled-components";
import { useEffect } from "react";
import { ModalSection } from "./ui/modal-section/modal-section";

interface Props {
  username?: string;
  birth: string;
  setBirth: (value: string) => void;
  gender: "MALE" | "FEMALE" | "OTHER" | "";
  setGender: (value: "MALE" | "FEMALE" | "OTHER") => void;
}

export const InitModalStep1 = ({
  username,
  birth,
  setBirth,
  gender,
  setGender,
}: Props) => {
  useEffect(() => {
    console.log("user.username");
    console.log(username);
  }, []);

  return (
    <Container>
      <Title>
        {username}님의
        <br />
        나이와 성별을 선택해주세요
      </Title>
      <ModalSectionContainer>
        <ModalSection isAge={true} birth={birth} setBirth={setBirth} />
        <ModalSection isAge={false} gender={gender} setGender={setGender} />
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
