import styled from "styled-components";

export const Contaienr = styled.div`
  flex: 1;
  height: 650px;
  padding: 44px 44px 0 44px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background.normal};
`;

export const ChargeBoxRow = styled.div`
display: flex;
margin-bottom: 39px;
gap: 32px;
`

export const SegmentButtonRow = styled.div`
display: flex;
gap: 26px;
`