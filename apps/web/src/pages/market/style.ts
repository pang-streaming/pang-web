import styled from "styled-components";

export const MarketContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
	padding: 44px;
	box-sizing: border-box;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 24px;
  border-radius: ${({theme}) => theme.borders.large};
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
