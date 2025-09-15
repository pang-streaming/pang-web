import styled from "styled-components";

export const Container = styled.div`
  padding: 18px 15px 12px 15px;
  border-radius: ${({ theme }) => theme.borders.large};
  border: 1px solid ${({ theme }) => theme.colors.content.normal};
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
  width: 100%;
  margin-bottom: 5px;
`;
export const CardListContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.background.normal};
  align-items: flex-start;
`;
