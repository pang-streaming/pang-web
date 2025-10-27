import { CardListSection } from './widget/card-list-section'
import { AddCardSection } from './widget/add-card-section'
import { FinalAmountField } from '../../ui'
import { SubmitButton } from '@pang/shared/ui'
import styled from 'styled-components'
import { useState } from 'react'

interface PaymentChoiceProps {
  pungAmount: number;
  toPaymentAdd: () => void;
  onBackToPungCharge: () => void;
  onCardAdded?: () => void;
  cardRefreshTrigger?: number;
  onCharge?: (cardId: string, amount: number) => void;
}

export const PaymentChoice = ({ pungAmount, toPaymentAdd, onBackToPungCharge, cardRefreshTrigger, onCharge }: PaymentChoiceProps) => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(undefined);

  const handleCharge = async () => {
    if (selectedCardId && onCharge) {
      await onCharge(selectedCardId, pungAmount);
    }
  };

  return (
    <Container>
        <CardListSection
          refreshTrigger={cardRefreshTrigger}
          selectedCardId={selectedCardId}
          onCardSelect={setSelectedCardId}
        />
        <AddCardSection toPaymentAdd={toPaymentAdd} />
        <FinalAmountField pungAmount={pungAmount} />
        <SubmitButton
          onClick={handleCharge}
          disabled={!selectedCardId}
        >
          펑 충전하기
        </SubmitButton>
    </Container>
  )
}


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  user-select: none;
`;
