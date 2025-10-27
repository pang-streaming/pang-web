import { TabTitleText } from '@/shared/ui/tab-title-text'
import { useParams, useLocation } from 'react-router-dom'
import { useCategoryByProduct } from '@/features/market/hooks/useProduct'
import styled from 'styled-components'
import { SkeletonGrid } from '@/shared/ui/skeleton'
import { VirtualModelElem } from '../../widget/market-section/widget/virtual-model-section/components/virtual-model-elem'


export const MarketCategoryDetail = () => {
  const { title } = useParams<{ title: string }>();
  const location = useLocation();
  const displayTitle = location.state?.title || title;
  
  const queryMap: Record<string, string> = {
    "3D 모델": "VIRTUAL_MODEL",
    "오디오 굿즈": "AUDIO_GOODS",
    "굿즈": "GOODS",
    "음악": "MUSIC",
    "일러스트": "ILLUSTRATION",
    "기타": "ETC",
  };
  
  const query = queryMap[title || ""] || title;
  const { data: categoryByProducts, isLoading, isError } = useCategoryByProduct(query!);

  if (isLoading) {
    return (
      <Container>
        <TabTitleText>{displayTitle!}</TabTitleText>
        <SkeletonGrid count={12} minWidth={200} gap={27} itemHeight={240} />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <TabTitleText>{displayTitle!}</TabTitleText>
        <ErrorMessage>상품을 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      </Container>
    );
  }

  if (!categoryByProducts || categoryByProducts.data.length === 0) {
    return (
      <Container>
        <TabTitleText>{displayTitle!}</TabTitleText>
        <EmptyMessage>해당 카테고리에 상품이 없습니다</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <TabTitleText>{displayTitle!}</TabTitleText>
      <ProductGrid>
        {categoryByProducts.data.map((item) => (
          <VirtualModelElem
            key={item.id}
            id={item.id}
            image={item.image}
            productName={item.name}
            price={item.price}
          />
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 27px;
  padding: 18px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: 12px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
    padding: 12px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 10px;
  }
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
