import styled from "styled-components";
import { formattedPrice } from "../util/formatted-price";



interface ProductCardProps {
  image?: string;
  title: string;
  price: number;
  onClick?: () => void;
}

export function ProductCard({ image, title, price, onClick }: ProductCardProps) {
  return (
    <Card onClick={onClick}>
      <Image src={image ?? ""} alt={title} />
      <Title>{title}</Title>
      <Price>{formattedPrice(price)}원</Price>
    </Card>
  );
}
const Card = styled.div`
  width: 160px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: white;
  cursor: pointer;
  transition: transform 0.12s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.p`
  width: 150px;
  margin-top: 8px;
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  font-weight: 400;
`;

const Price = styled.p`
  width: 150px;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  justify-content: flex-end;
  color: #FF0055;
`;
