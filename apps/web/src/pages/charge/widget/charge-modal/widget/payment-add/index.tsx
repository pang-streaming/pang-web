import React from "react";
import styled from "styled-components";
import { CardInfoSection } from "./widget/card-info-section";
import { ChargeButton } from "@/pages/charge/ui/charge-button";
import { SubmitButton } from "@pang/shared/ui";

interface PaymentAddProps {
  onBackToPaymentChoice: () => void;
}

export const PaymentAdd = ({ onBackToPaymentChoice }: PaymentAddProps) => {
  return (
    <Container>
      <CardInfoSection />
      <SubmitButton onClick={onBackToPaymentChoice}>카드 등록하기</SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;
