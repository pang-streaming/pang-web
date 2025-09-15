import styled from "styled-components";
import * as W from './widget/index';
import { SubmitButton } from "@pang/shared/ui";

interface PungChargeProps {
  pungAmount: number;
  onPungChange: (amount: number) => void;
  toPaymentChoice: () => void;
}

export const PungCharge = ({ pungAmount, onPungChange, toPaymentChoice }: PungChargeProps) => {

  return (
    <Container>
      <W.IncreaseField pungAmount={pungAmount} onPungChange={onPungChange} />
      <W.FinalAmountField pungAmount={pungAmount} />
      <W.AgreeRow />
      <SubmitButton onClick={toPaymentChoice}>결제수단 선택하기</SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  user-select: none;
`;
