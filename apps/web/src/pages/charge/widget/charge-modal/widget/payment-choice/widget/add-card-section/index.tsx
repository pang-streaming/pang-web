import { ChargeButton } from "@/pages/charge/ui/charge-button";
import React from "react";
import styled from "styled-components";
import { FinalAmountField } from "../../../pung-charge/widget";

interface AddCardSectionProps {
  toPaymentAdd: () => void;
}

export const AddCardSection = ({ toPaymentAdd }: AddCardSectionProps) => {
  return (
    <Container>
      <Text>카드가 목록에 없나요?</Text>
      <ChargeButton onClick={toPaymentAdd}>카드 추가</ChargeButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 12px;
  border-radius: ${({ theme }) => theme.borders.large};
  border: 1px solid ${({ theme }) => theme.colors.content.normal};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;
