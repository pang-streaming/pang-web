import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 44px 44px 0 44px;
  border-radius: ${({theme}) => theme.borders.large};
	background-color: ${({ theme }) => theme.colors.content.normal};
`;

export const ChargeBoxRow = styled.div`
display: flex;
margin-bottom: 39px;
gap: 32px;
`