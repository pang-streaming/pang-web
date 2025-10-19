import { TabTitleText } from "@/shared/ui/tab-title-text";
import * as S from "./style";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { SkeletonGrid, SkeletonBox } from "@/shared/ui/skeleton";
import { StoreProduct, Store } from "@/entities/store/type";
import { useStoreProduct } from "@/entities/store/useStore";

export const StoreDetail = () => {
  const { state } = useLocation();
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const storeInfo = state as Store | null;

  const { data: products, isLoading, isError } = useStoreProduct(storeId!);

  console.log("products:", products);

  if (!storeId) {
    return <S.Container>스토어 ID가 없습니다.</S.Container>;
  }

  if (!storeInfo) {
    return <S.Container>스토어 정보를 불러올 수 없습니다.</S.Container>;
  }

  if (isLoading) {
    return (
      <S.Container>
        <SkeletonBox width="100%" height={200} radius={12} />
        <S.ProfileWrapper>
          <SkeletonBox width={100} height={100} radius="50%" />
          <SkeletonBox width={150} height={30} radius={6} />
        </S.ProfileWrapper>
        {/* <SkeletonGrid count={6} minWidth={200} itemHeight={250} gap={16} /> */}
      </S.Container>
    );
  }

  if (isError) {
    return <S.Container>상품을 불러오는 중 오류가 발생했습니다.</S.Container>;
  }

  const { name, profileImage, bannerImage, description } = storeInfo;

  const handleProductClick = (productId: string) => {
    navigate(`/market-detail?id=${productId}`);
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
