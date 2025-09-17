import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 44px 44px 0 44px;
  border-radius: ${({ theme }) => theme.borders.large};
  background-color: ${({ theme }) => theme.colors.content.normal};
  margin-top: 24px;
  min-height: calc(100vh - 4em - 200px);
`;

export const ChargeBoxRow = styled.div`
  display: flex;
  margin-bottom: 39px;
  gap: 32px;
`;
