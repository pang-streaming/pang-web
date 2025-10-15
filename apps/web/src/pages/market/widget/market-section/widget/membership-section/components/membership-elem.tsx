import { formattedPrice } from "@/pages/market/util/formatted-price";
import styled from "styled-components";

import dotty from '@/app/assets/dotty.png'

export interface MembershipElemProps {
  image: string;
  company: string;
  productName: string;
  price: number;
}

export const MembershipElem = ({
  image,
  company,
  price,
  productName,
}: MembershipElemProps) => {
  return (
    <Container>
      <Image src={dotty} />
      <Company>{company}</Company>
      <ProductName>{productName}</ProductName>
      <Price>{formattedPrice(price)}원</Price>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 150px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Company = styled.span`
    font-size: ${({ theme }) => theme.font.xSmall};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text.subtitle};
    margin-bottom: 5px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: ${({ theme }) => theme.borders.large};
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductName = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 5px;
`;

const Price = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary.normal};
`;
