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
  padding: 12px;
  border-radius: ${({theme}) => theme.borders.medium};
  text-align: center;
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.colors.text.normal};
  cursor: pointer;
	border: 3px solid transparent;

  &:hover {
		  border: 3px solid ${({theme}) => theme.colors.primary.normal};
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: ${({theme}) => theme.borders.medium};
`;

const Title = styled.p`
	width: 150px;
  margin-top: 8px;
	text-align: left;
  font-size: ${({theme}) => theme.font.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Price = styled.p`
  width: 150px;
  margin-top: 4px;
  font-size: ${({theme}) => theme.font.large};
  font-weight: 800;
  display: flex;
  justify-content: flex-end;
  color: ${({theme}) => theme.colors.primary.normal};
`;
