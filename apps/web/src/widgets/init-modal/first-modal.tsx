import styled from "styled-components";
import { ModalSection } from "./ui/modal-section/modal-section";

interface Props {
  username?: string;
  birth: string;
  setBirth: (value: string) => void;
  gender: "MALE" | "FEMALE" | "OTHER" | "";
  setGender: (value: "MALE" | "FEMALE" | "OTHER") => void;
  nickname: string;
  setNickname: (value: string) => void;
}

export const InitModalStep1 = ({
  username,
  birth,
  setBirth,
  gender,
  setGender,
  nickname,
  setNickname
}: Props) => {
  return (
    <Container>
      <Title>
        {username}님의
        <br />
        나이와 성별을 선택해주세요
      </Title>
      <ModalSectionContainer>
        <ModalSection type="age" birth={birth} setBirth={setBirth} />
        <ModalSection type="gender" gender={gender} setGender={setGender} />
        <ModalSection type="nickname" nickname={nickname} setNickname={setNickname} />
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
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 800;
  text-align: left;
  color: ${({ theme }) => theme.colors.common.white};
`;

const ModalSectionContainer = styled.div`
  width: 100%;
  height: 114px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
