

import React from 'react'
import styled from 'styled-components'

interface CardElemProps {
    id: string;
    image: string;
    cardName: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

export const CardElem = ({id, image, cardName, isSelected, onSelect}: CardElemProps) => {
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <Container onClick={handleClick} isSelected={isSelected}>
        <img style={{marginRight:10}} src={image} />
        <Text>{cardName}</Text>
        {isSelected && <SelectionIndicator />}
    </Container>
  )
}


const Container = styled.div<{ isSelected: boolean }>`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 8px;
    border-radius: ${({ theme }) => theme.borders.small};
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid ${({ theme, isSelected }) =>
        isSelected ? theme.colors.primary.normal : 'transparent'};
    background-color: ${({ theme, isSelected }) =>
        isSelected ? theme.colors.primary.light : 'transparent'};

    &:hover {
        background-color: ${({ theme, isSelected }) =>
            isSelected ? theme.colors.primary.light : theme.colors.background.light};
    }
`

const SelectionIndicator = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary.normal};
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        content: '✓';
        color: white;
        font-size: 12px;
        font-weight: bold;
    }
`
const Text = styled.span`
    font-size: ${({theme}) => theme.font.large};
    font-weight: 500;
    margin-right: auto;
    color: ${({theme}) => theme.colors.text.normal};
`