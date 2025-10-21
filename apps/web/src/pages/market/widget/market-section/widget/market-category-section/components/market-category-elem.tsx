// MarketCategoryElem.tsx
import styled from "styled-components";

export interface MarketCategoryElemProps {
  image: string;
  title: string;
  query: string;
  onClick?: () => void; 
}

export const MarketCategoryElem = ({ image, title, onClick }: MarketCategoryElemProps) => {
  return (
    <Container onClick={onClick}>
      <ImageContainer src={image} />
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ImageContainer = styled.img`
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.borders.large};
  background-color: ${({ theme }) => theme.colors.content.normal};
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  width: calc(100% - 10px);
  text-align: center;
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: 700;
`;
