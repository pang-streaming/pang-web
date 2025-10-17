import { ReactNode } from "react";
import styled from "styled-components";

interface MarketSectionProps {
    title: string;
    children: ReactNode;
}

export const MarketSection = ({title, children}:MarketSectionProps) => {
    return (
        <Container>
            <Title>{title}</Title>
            {children}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    padding: 0 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`

const Title = styled.span`
    font-size: ${({theme}) => theme.font.xxLarge};
    font-weight: 600;
    color: ${({theme}) => theme.colors.text.normal};
`