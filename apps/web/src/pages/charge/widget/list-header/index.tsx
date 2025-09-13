import styled from "styled-components";

export const ListHeader = () => {
  return (
    <Container>
      <Item $ratio={1}>사용일시</Item>
      <Item $ratio={1}>사용수량</Item>
      <Item $ratio={1}>사용내용</Item>
      <Item $ratio={2}>사용채널</Item>
      <Item $ratio={3}>후원메시지</Item>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-top: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;

const Item = styled.span<{ $ratio: number }>`
  flex: ${({ $ratio }) => $ratio};
  color: ${({ theme }) => theme.colors.text.normal};
  text-align: center;
`;