import React from "react";
import styled from "styled-components";

export const PungField = () => {
  return (
    <Wrapper>
        <Text>충전할 펑</Text>
      <Container>
        <span style={{ fontSize: 20 }}>💣</span>
        <Field>1000</Field>
      </Container>
    </Wrapper>
  );
};

const Text = styled.span`
    font-size: ${({theme}) => theme.font.large};
    font-weight: 600;
    color: ${({theme}) => theme.colors.text.subtitle};
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  width: 187px;
  height: 37px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: ${({ theme }) => theme.borders.medium};
  padding-left: 11px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: 11px;
`;

const Field = styled.span`
font-size: ${({theme}) => theme.font.xLarge};
font-weight: 600;
color: ${({theme})=>theme.colors.text.normal};
`;
