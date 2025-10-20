import { TabTitleText } from "@/shared/ui/tab-title-text";
import * as S from "./style";
import { useParams, useNavigate } from "react-router-dom";
import { SkeletonBox } from "@/shared/ui/skeleton";
import { useStoreProduct, useStore } from "@/entities/store/useStore";

export const StoreDetail = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();

  const { data: allStores, isLoading: isStoresLoading } = useStore();
  const { data: products, isLoading: isProductsLoading, isError } = useStoreProduct(storeId!);

  console.log("products:", products);
  console.log("allStores:", allStores);

  if (!storeId) {
    return <S.Container>스토어 ID가 없습니다.</S.Container>;
  }

  const isLoading = isStoresLoading || isProductsLoading;

  if (isLoading) {
    return (
      <S.Container>
        <SkeletonBox width="100%" height={200} radius={12} />
        <S.ProfileWrapper>
          <SkeletonBox width={100} height={100} radius="50%" />
          <SkeletonBox width={150} height={30} radius={6} />
        </S.ProfileWrapper>
      </S.Container>
    );
  }

  const storeInfo = allStores?.data?.find(store => store.id === storeId);

  if (!storeInfo) {
    return <S.Container>스토어 정보를 불러올 수 없습니다.</S.Container>;
  }

  if (isError) {
    return <S.Container>상품을 불러오는 중 오류가 발생했습니다.</S.Container>;
  }

  const { name, profileImage, bannerImage, description } = storeInfo;

  const handleProductClick = (productId: string) => {
    navigate(`/market-detail?productId=${productId}`);
  };

  return (
    <S.Container>
      <S.BannerImage src={bannerImage} alt={`${name} 배너`} />
      <S.ProfileWrapper>
        <S.ProfileImage src={profileImage} alt={`${name} 프로필`} />
        <S.StoreName>{name}</S.StoreName>
      </S.ProfileWrapper>

      {description && <S.Description>{description}</S.Description>}

      <TabTitleText>상품 목록</TabTitleText>

      <S.ProductGrid>
        {products?.data && products.data.length > 0 ? (
          products.data.map((product) => (
            <S.ProductCard key={product.id} onClick={() => handleProductClick(product.id)}>
              <S.ProductImage src={product.image} alt={product.name} />
              <S.ProductInfo>
                <S.ProductName>{product.name}</S.ProductName>
                <S.ProductPrice>
                  {product.price.toLocaleString()}원
                </S.ProductPrice>
              </S.ProductInfo>
            </S.ProductCard>
          ))
        ) : (
          <S.EmptyMessage>등록된 상품이 없습니다.</S.EmptyMessage>
        )}
      </S.ProductGrid>
    </S.Container>
  );
};


