import React from "react";
import styled from "styled-components";

interface PungFieldProps {
  pungAmount: number;
  type: "charge" | "sponsor";
}

export const PungField = ({ pungAmount, type }: PungFieldProps) => {
  return (
    <Wrapper>
      <Text>{type === "charge" ? "충전할 펑" : "후원할 펑"}</Text>
      <Container type={type}>
        <span style={{ fontSize: 20 }}>💣</span>
        <Field
          type="text"
          value={pungAmount.toLocaleString()}
          readOnly
        />
      </Container>
    </Wrapper>
  );
};

const Text = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface IContainerProps {
  type: "charge" | "sponsor";
}

const Container = styled.div<IContainerProps>`
  width: 187px;
  height: 37px;
  background-color: ${({ theme, type }) =>
    type === "sponsor"
      ? theme.colors.content.normal
      : theme.colors.background.normal};
  border-radius: ${({ theme }) => theme.borders.medium};
  padding-left: 11px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: 11px;
`;

const Field = styled.input`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
`;
