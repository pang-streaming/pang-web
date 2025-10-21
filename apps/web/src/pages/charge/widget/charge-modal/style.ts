import styled from "styled-components";

export const Container = styled.div`
  width: 449px;
  box-shadow: 0 1px 50px 0 rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.background.dark};
`;

export const Content = styled.div`
  padding: 18px 20px 23px 20px;
`;
