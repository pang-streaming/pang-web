import React from "react";
import styled from "styled-components";
import { AmountChip } from "../ui/amount-chip";
import { PungField } from "../ui/pung-field";

export const IncreaseField = () => {
  return (
    <Container>
      <PungField />
      <AmountChipRow>
        <AmountChip amount={1000} />
        <AmountChip amount={5000} />
        <AmountChip amount={10000} />
        <AmountChip amount={5000} />
      </AmountChipRow>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 16px 13px 16px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 114px;
  border-radius: ${({ theme }) => theme.borders.large};
  background-color: transparent;
  justify-content: space-between;
  border: 1px solid #262626;
`;

const AmountChipRow = styled.div`
  display: flex;
  gap: 5px;
`;
