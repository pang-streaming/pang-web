import styled from "styled-components";

export const NotFound = () => {
  return (
    <Container>
      <span style={{ color: "white" ,fontSize: 30}}>not found</span>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
