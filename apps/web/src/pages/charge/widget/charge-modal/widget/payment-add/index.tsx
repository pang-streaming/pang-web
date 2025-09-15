import React, { useState } from "react";
import styled from "styled-components";
import { CardInfoSection } from "./widget/card-info-section";
import { ChargeButton } from "@/pages/charge/ui/charge-button";
import { SubmitButton } from "@pang/shared/ui";
import { CardInfo, paymentApi } from "@/entities/payment/api";

interface PaymentAddProps {
  onBackToPaymentChoice: () => void;
  onCardAdded?: () => void;
}

export const PaymentAdd = ({ onBackToPaymentChoice, onCardAdded }: PaymentAddProps) => {
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    name: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    password: '',
    owner: '',
    phoneNumber: '',
    birth: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await paymentApi.addCard(cardInfo);
      onCardAdded?.();
      onBackToPaymentChoice();
    } catch (error) {
      console.error('카드 등록 실패:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <CardInfoSection cardInfo={cardInfo} onCardInfoChange={setCardInfo} />
      <SubmitButton onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '등록 중...' : '카드 등록하기'}
      </SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;
