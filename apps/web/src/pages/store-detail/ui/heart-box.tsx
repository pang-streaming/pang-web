import styled from "styled-components"
import heart from '@/app/assets/heart copy.svg';

export const HeartBox = () => {
    return (
    <Container>
        <img src={heart} />
        <Count>22360</Count>
    </Container>
    )
}

const Container = styled.div`
    padding: 10px 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    border: 1px solid #989898;
`
const Count = styled.span`
    font-size: ${({theme}) => theme.font.small};
    font-weight: 400;
    color: #D4D4D4;
`