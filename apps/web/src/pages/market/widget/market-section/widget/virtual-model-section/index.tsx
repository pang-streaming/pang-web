import styled from "styled-components";
import { VirtualModelElem } from "./components/virtual-model-elem";
import { useProduct } from "@/pages/market/hooks/useProduct";
import { SkeletonGrid } from "@/shared/ui/skeleton";
import { EmptyMessage } from "@/pages/market/page/store-detail/style";

export const VirtualModelSection = () => {
  const { data: items, isLoading, isError, isSuccess } = useProduct();

  if (isLoading) {
    return (
      <Container>
        <SkeletonGrid count={4} minWidth={168} itemHeight={224} gap={27} />
      </Container>
    );
  }
  if (isError)
    return (
      <Container>
        <ErrorBox>상품 정보를 불러오는 데 실패했습니다.</ErrorBox>
      </Container>
    );

  return (
    <Container>
      {isSuccess && items?.length === 0 ? (
        <EmptyMessage>아직 등록된 상품이 없어요 🥺</EmptyMessage>
      ) : (
        <Row>
          {items?.map((v) => (
            <VirtualModelElem
              key={v.id}
              id={v.id}
              image={v.image}
              productName={v.name}
              price={v.price}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 18px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Row = styled.div`
  padding: 18px;
  gap: 27px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: 12px;
`;

const Message = styled.div`
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 14px;
`;

const ErrorBox = styled.div`
  padding: 16px;
  color: red;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: 8px;
  font-weight: 500;
`;
