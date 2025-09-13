import styled from "styled-components";

export const Container = styled.div`
  width: 449px;
  height: 165px;
  padding: 40px 20px 20px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.normal};
`;

export const Title = styled.span`
  font-size: 20px;
  font-weight: 900;
  color: #f2f2f2;
`;

export const LoginButton = styled.button`
  border-radius: 8px;
  height: 50px;
`;
