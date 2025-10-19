import { TabTitleText } from "@/shared/ui/tab-title-text";
import styled from "styled-components";
import { useGifts } from "./useGift";
import { VirtualModelElem } from "@/pages/market/widget/market-section/widget/virtual-model-section/components/virtual-model-elem";
import { SkeletonGrid } from "@/shared/ui/skeleton";

export const GiftList = () => {
  const { data, isLoading, isError } = useGifts();

  if (isLoading) {
    return (
      <div>
        <TabTitleText>내가 받은 선물</TabTitleText>
        <SkeletonGrid count={3} minWidth={200} itemHeight={220} />
      </div>
    );
  }

  if (isError) return <div>선물 정보를 불러오지 못했습니다.</div>;

  const gifts = data?.data || [];

  return (
    <Container>
      <TabTitleText>내가 받은 선물</TabTitleText>
      {gifts.length === 0 ? (
        <EmptyVideoTitle>받은 선물이 없습니다.</EmptyVideoTitle>
      ) : (
        <div style={{ marginTop: 30 }}>
          {gifts.map((gift) => (
            <VirtualModelElem
              id={gift.productId}
              image={gift.imageUrl}
              price={gift.price}
              productName={gift.name}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

const EmptyVideoTitle = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;


const Container = styled.div`
   width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
`