import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
export const Label = styled.span`
  font-weight: 500;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const Divider = styled.div<{ color: string }>`
  width: 100%;
  height: 1px;
  margin: 15px 0;
  background-color: ${({ color }) => color};
`;

