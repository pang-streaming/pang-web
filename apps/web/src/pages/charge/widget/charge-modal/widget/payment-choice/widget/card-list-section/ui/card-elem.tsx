

import React from 'react'
import styled from 'styled-components'
import menu from '@/app/assets/payment/menu.svg'

interface CardElemProps {
    image: string;
    cardName: string;
}

export const CardElem = ({image,cardName}:CardElemProps) => {
  return (
    <Container>
        <img style={{marginRight:10}} src={image} />
        <Text>{cardName}</Text>
        <img src={menu} />
    </Container>
  )
}


const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;

`
const Text = styled.span`
    font-size: ${({theme}) => theme.font.large};
    font-weight: 500;
    margin-right: auto;
    color: ${({theme}) => theme.colors.text.normal};
`