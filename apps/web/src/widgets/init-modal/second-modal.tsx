import styled from "styled-components";
import { CategorySelector } from "./ui/category-selector";

interface InitModalStep2Props {
  username?: string;
  onSuccess?: () => void;
}

export const InitModalStep2 = ({ username, onSuccess }: InitModalStep2Props) => {
  return (
    <Container>
      <Title>
        {username}님의
        <br />
        취향을 선택해주세요
      </Title>
      <CategorySelector onSuccess={onSuccess} />
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
  color: ${({theme}) => theme.colors.text.normal};
  font-size: ${({theme}) =>theme.font.xxLarge};
  font-weight: 800;
  text-align: left;
`;
