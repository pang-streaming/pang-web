import styled from "styled-components";

export const TagBox = ({ text }: { text: string }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 40px;
  height: 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #1e1e1e;
  white-space: nowrap;            
  &:hover {
    background-color: #353535;
  }
`;

const Text = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: #d9d9d9;
  user-select: none;
`;
