import styled from "styled-components";
import * as W from './widget/index';
import { SubmitButton } from "@pang/shared/ui";

interface PungChargeProps {
  toPaymentChoice: () => void;
}

export const PungCharge = ({ toPaymentChoice }: PungChargeProps) => {
  return (
    <Container>
      <W.IncreaseField />
      <W.FinalAmountField />
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
