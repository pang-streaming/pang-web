
import { formattedPrice } from "@/pages/market/util/formatted-price";
import styled from "styled-components";

interface AmountChipProps {
  amount: number;
  onClick?: () => void;
}

export const AmountChip = ({ amount, onClick }: AmountChipProps) => {
  return (
    <Container onClick={onClick}>
      <Amount>{formattedPrice(amount)}</Amount>
    </Container>
  );
};

const Container = styled.div`
  width: 86px;
  height: 28px;
  border-radius: ${({theme}) => theme.borders.maximum};
  border: ${({ theme }) => theme.borders.maximum};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #737373;
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    background-color: ${({ theme }) => theme.colors.primary.normal}20;
  }
`;

const Amount = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
