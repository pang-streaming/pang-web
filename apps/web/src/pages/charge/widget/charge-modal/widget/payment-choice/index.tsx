

import React from 'react'
import { CardListSection } from './widget/card-list-section'
import { AddCardSection } from './widget/add-card-section'
import { FinalAmountField } from '../pung-charge/widget'
import { SubmitButton } from '@pang/shared/ui'
import styled from 'styled-components'

interface PaymentChoiceProps {
  toPaymentAdd: () => void;
  onBackToPungCharge: () => void;
}

export const PaymentChoice = ({ toPaymentAdd, onBackToPungCharge }: PaymentChoiceProps) => {
  return (
    <Container>
        <CardListSection />
        <AddCardSection toPaymentAdd={toPaymentAdd} />
        <FinalAmountField />
        <SubmitButton onClick={onBackToPungCharge}>펑 충전하기</SubmitButton>
    </Container>
  )
}


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  user-select: none;
`;
