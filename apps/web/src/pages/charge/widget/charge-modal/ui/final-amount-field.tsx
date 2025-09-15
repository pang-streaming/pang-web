


import { formattedPrice } from '@/pages/market/util/formatted-price'
import styled from 'styled-components'

export const FinalAmountField = () => {
  return (
    <Container>
        <LeftText>최종 결제금액</LeftText>
        <RightText>{formattedPrice(1100)}원</RightText>
    </Container>
  )
}


const Container = styled.div`
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 28px;
    justify-content: space-between;
    border-radius: ${({theme}) => theme.borders.large};
    background-color: ${({theme}) => theme.colors.background.normal};
`


const LeftText = styled.span`
    font-size: ${({theme}) => theme.font.medium};
    font-weight: 700;
    color: ${({theme}) => theme.colors.primary.normal};
`
const RightText = styled.span`
    font-size: ${({theme}) => theme.font.large};
    font-weight: 900;
    color: ${({theme}) => theme.colors.primary.normal};
`