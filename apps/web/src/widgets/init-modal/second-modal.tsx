import styled from "styled-components";
import { CategorySelector } from "./ui/category-selector";

export const InitModalStep2 = ({username}:{username?:string}) => {


  return (
    <Container>
      <Title>
        {username}님의
        <br />
        당신의 취향을 선택해주세요
      </Title>
      <CategorySelector />
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
