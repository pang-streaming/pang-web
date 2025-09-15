

import React from 'react'
import styled from 'styled-components'
import menu from '@/app/assets/payment/menu.svg'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardElemProps {
    id: string;
    image: string;
    cardName: string;
}

export const CardElem = ({id, image, cardName}: CardElemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Container ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
    align-items: center;
    box-sizing: border-box;
    padding: 8px;
    border-radius: ${({ theme }) => theme.borders.small};
    cursor: grab;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.background.light};
    }
    
    &:active {
        cursor: grabbing;
    }
`
const Text = styled.span`
    font-size: ${({theme}) => theme.font.large};
    font-weight: 500;
    margin-right: auto;
    color: ${({theme}) => theme.colors.text.normal};
`