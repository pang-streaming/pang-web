import { TabTitleText } from '@/shared/ui/tab-title-text'
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useCategoryByProduct } from '../../hooks/useProduct'
import styled from 'styled-components'
import { SkeletonGrid } from '@/shared/ui/skeleton'


export const MarketCategoryDetail = () => {
  const { query } = useParams<{ query: string }>();
  const location = useLocation();
  const title = location.state?.title || query;
  const { data: categoryByProducts, isLoading, isError } = useCategoryByProduct(query!);

  if (isLoading) {
    return (
      <Container>
        <TabTitleText>{title!}</TabTitleText>
        <SkeletonGrid count={12} minWidth={150} gap={16} itemHeight={150} />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <TabTitleText>{title!}</TabTitleText>

        <ErrorMessage>상품을 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      </Container>
    );
  }

  if (!categoryByProducts || categoryByProducts.data.length === 0) {
    return (
      <Container>
        <TabTitleText>{title!}</TabTitleText>

        <EmptyMessage>해당 카테고리에 상품이 없습니다</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <TabTitleText>{title!}</TabTitleText>
      <ProductGrid>
        {categoryByProducts.data.map((item) => (
          <ProductCard key={item.id}>
            <ProductImage src={item.image} alt={item.name} />
            <ProductInfo>
              <ProductName>{item.name}</ProductName>
              <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 18px;
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const ProductCard = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.content.normal};
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 4px;
  gap: 4px;
`;

const ProductName = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const ProductPrice = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.primary.normal};
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.large};
  padding: 40px 20px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.large};
  padding: 40px 20px;
`;
