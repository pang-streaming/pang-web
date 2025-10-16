import { formattedPrice } from "@/pages/market/util/formatted-price";
import styled from "styled-components";
import model from '@/app/assets/model.png'
import { useNavigate } from "react-router-dom";

export interface VirtualModelElemProps {
  image: string;
  productName: string;
  price: number;
}

export const VirtualModelElem = ({image,price,productName,}: VirtualModelElemProps) => {

  const navigate = useNavigate();
  const handleProduct = () => {
    navigate("/market-detail", {
      state: {
        image: model,     
        name: productName, 
        price,          
        seller: "판매자닉네임", 
      },
    });
  }
  return (
    <Container onClick={handleProduct}>
      <Image src={model} />
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

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: ${({ theme }) => theme.borders.large};
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductName = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 17px;
`;

const Price = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary.normal};
`;
