import styled from "styled-components";
import { PopularModelStoreElem } from "./components/popular-model-store-elem";
import { useStore } from "@/entities/store/useStore";
import { SkeletonGrid } from "@/shared/ui/skeleton";

export const PopularModelStore = () => {
  const { data: storeData, isLoading, isError } = useStore();

  if (isLoading) {
    return (
      <Container>
        <SkeletonGrid count={4} minWidth={168} itemHeight={224} gap={27} />
      </Container>
    );
  }

  if (isError || !storeData || !storeData.data || storeData.data.length === 0) {
    return (
      <Container>
        <EmptyMessage>등록된 스토어가 없습니다.</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        {storeData.data.map((store) => (
          <PopularModelStoreElem
            key={store.id}
            id={store.id}
            name={store.name}
            profileImage={store.profileImage}
            bannerImage={store.bannerImage}
            description={store.description}
          />
        ))}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border-radius: 12px;
  gap: 33px;
`;

const Row = styled.div`
  padding: 0 28px;
  gap: 27px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 12px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.large};
`;
