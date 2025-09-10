import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
`;


export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(383px, 1fr));
  row-gap: 30px;
  column-gap: 30px;
`;
