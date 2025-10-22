import React from 'react'
import styled from 'styled-components';

interface IncreaseFieldProps {
  pungAmount: number;
  onPungChange: (amount: number) => void;
}

export const IncreaseField = ({ pungAmount, onPungChange }: IncreaseFieldProps) => {
  return (
    <Container>
      <Text>후원할 펑</Text>
      <AmountInput
        value={pungAmount}
        onChange={(e) => onPungChange(Number(e.target.value))}
        placeholder="0"
        min="0"
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 16px 16px 16px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: ${({ theme }) => theme.borders.large};
  background-color: transparent;
  border: 1px solid #262626;
`;

const Text = styled.span`
  font-size: ${({theme}) => theme.font.large};
  font-weight: 600;
  color: ${({theme}) => theme.colors.text.subtitle};
`;

const AmountInput = styled.input.attrs({ type: "number" })`
  font-size: ${({theme}) => theme.font.large};
  font-weight: 900;
  color: ${({theme}) => theme.colors.primary.normal};
  background: transparent;
  border: none;
  outline: none;
  text-align: right;
  width: 100px;
  
  &::placeholder {
    color: ${({theme}) => theme.colors.text.subtitle};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

