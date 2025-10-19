import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borders.medium};
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -40px;
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borders.maximum};
  border: 3px solid white;
  object-fit: cover;
`;

export const StoreName = styled.h2`
  margin-top: 12px;
  font-size: ${({ theme }) => theme.font.xLarge};
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const Description = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
  font-size: ${({ theme }) => theme.font.medium};
`;

export const ProductGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

export const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.medium};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: translateY(-4px);
    opacity: 0.9;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  padding: 12px;
  text-align: center;
  position: relative;
`;

export const ProductName = styled.h4`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0 0 8px 0;
`;

export const ProductPrice = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
  display: block;
`;

export const LikedBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 16px;
`;

export const BuyButton = styled.button`
  width: 90%;
  margin-bottom: 12px;
  padding: 8px 0;
  background: ${({ theme }) => theme.colors.primary.normal};
  border: none;
  border-radius: ${({ theme }) => theme.borders.small};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.large};
`;
