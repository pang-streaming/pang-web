import styled from "styled-components";
import { VirtualModelElem } from "./components/virtual-model-elem";
import { useProduct } from "@/pages/market/hooks/useProduct";
import { VirtualModelElemSkeleton } from "@/shared/ui/skeleton";

export const VirtualModelSection = () => {
  const { data: items, isLoading, isError, isSuccess } = useProduct();

  if (isLoading)
    return (
      <Container>
        <Row>
          {new Array(6).fill(0).map((_, i) => (
            <VirtualModelElemSkeleton key={i} />
          ))}
        </Row>
        <Message>상품 정보를 불러오는 중입니다... ⏳</Message>
      </Container>
    );

  if (isError)
    return (
      <Container>
        <ErrorBox>상품 정보를 불러오는 데 실패했습니다.</ErrorBox>
      </Container>
    );

  return (
    <Container>
      {isSuccess && items?.length === 0 ? (
        <Message>아직 등록된 상품이 없어요 🥺</Message>
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
