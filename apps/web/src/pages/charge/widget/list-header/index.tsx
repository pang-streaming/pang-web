import { useTransaction, usePurchase } from "@/entities/transaction/hooks/useTransaction";
import styled from "styled-components";
import { Transaction, PurchaseHistory } from "@/entities/transaction/type";
import { TransactionSkeleton } from "@/shared/ui/skeleton";
import { ErrorScreen } from "@/shared/ui/error-screen";

interface ListHeaderProps {
  segmentType: string;
}

export const ListHeader = ({ segmentType }: ListHeaderProps) => {
  const isUseSegment = segmentType === "use";
  const { data, isError, isLoading, error } = useTransaction();
  const { data: purchaseData, isLoading: isPurchaseLoading, error: purchaseError } = usePurchase();

  const transactionList = !isUseSegment
    ? data?.data?.transactions?.filter((tx: Transaction) => tx.type === "CHARGE") || []
    : [];

  const purchaseList = isUseSegment ? (purchaseData?.data || []) : [];

  if (isUseSegment) {
    if (isPurchaseLoading) {
      return (
        <div>
          <TransactionSkeleton  />
        </div>
      );
    }

    if (purchaseError) {
      return (
        <ErrorScreen error={String(purchaseError)}/>
      );
    }

    if (purchaseList.length === 0) {
      return (
        <Container>
          <EmptyMessage>사용 내역이 없습니다</EmptyMessage>
        </Container>
      );
    }
  } else {
    if (isLoading) {
      return (
        <div>
          <TransactionSkeleton  />
        </div>
      );
    }

    if (error) {
      return (
        <ErrorScreen error={String(error)}/>
      );
    }

    if (transactionList.length === 0) {
      return (
        <Container>
          <EmptyMessage>충전 내역이 없습니다</EmptyMessage>
        </Container>
      );
    }
  }

  return (
    <TransactionContainer>
      {isUseSegment ? (
        <>
          <HeaderContainer>
            <HeaderItem $ratio={2}>구매일시</HeaderItem>
            <HeaderItem $ratio={1}>구매수량</HeaderItem>
            <HeaderItem $ratio={1}>사용내용</HeaderItem>
            <HeaderItem $ratio={2}>상품명</HeaderItem>
            <HeaderItem $ratio={3}>배송상태</HeaderItem>
          </HeaderContainer>

          {purchaseList.map((purchase: PurchaseHistory) => (
            <TransactionRow key={purchase.purchaseId}>
              <TransactionItem $ratio={2}>
                {new Date(purchase.createdAt).toLocaleString()}
              </TransactionItem>
              <TransactionItem $ratio={1}>
                {purchase.price.toLocaleString()} 펑
              </TransactionItem>
              <TransactionItem $ratio={1}>
                구매
              </TransactionItem>
              <TransactionItem $ratio={2}>{purchase.productName}</TransactionItem>
              <TransactionItem $ratio={3}>
                {getDeliveryStatusText(purchase.deliveryStatus)}
              </TransactionItem>
            </TransactionRow>
          ))}
        </>
      ) : (
        <>
          <HeaderContainer>
            <HeaderItem $ratio={2}>충전일시</HeaderItem>
            <HeaderItem $ratio={1}>충전수량</HeaderItem>
            <HeaderItem $ratio={1}>충전내용</HeaderItem>
            <HeaderItem $ratio={2}>충전채널</HeaderItem>
            <HeaderItem $ratio={3}>충전메시지</HeaderItem>
          </HeaderContainer>

          {transactionList.map((tx: Transaction) => (
            <TransactionRow key={tx.id}>
              <TransactionItem $ratio={2}>
                {new Date(tx.createdAt).toLocaleString()}
              </TransactionItem>
              <TransactionItem $ratio={1}>
                {tx.amount.toLocaleString()} 펑
              </TransactionItem>
              <TransactionItem $ratio={1}>
                충전
              </TransactionItem>
              <TransactionItem $ratio={2}>{tx.description || "-"}</TransactionItem>
              <TransactionItem $ratio={3}>{tx.description || "-"}</TransactionItem>
            </TransactionRow>
          ))}
        </>
      )}
    </TransactionContainer>
  );
};

const getDeliveryStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    PREPARING: "배송 준비중",
    SHIPPING: "배송중",
    DELIVERED: "배송 완료",
    CANCELED: "취소됨",
  };
  return statusMap[status] || status;
};

const Container = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-top: 1px solid ${({ theme }) => theme.colors.stroke.normal};
`;

const TransactionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-top: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  font-weight: 600;
`;

const TransactionRow = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  margin-bottom: 8px;
  padding-left: 10px;
  box-sizing: border-box;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borders.medium};

  &:hover {
    /* background-color: ${({ theme }) => theme.colors.hover.light}; */
  }
`;

const HeaderItem = styled.span<{ $ratio: number }>`
  flex: ${({ $ratio }) => $ratio};
  color: ${({ theme }) => theme.colors.text.normal};
  text-align: center;
  font-weight: 600;
`;

const TransactionItem = styled.span<{ $ratio: number }>`
  flex: ${({ $ratio }) => $ratio};
  color: ${({ theme }) => theme.colors.text.normal};
  text-align: center;
  font-size: ${({ theme }) => theme.font.large};
`;

const LoadingMessage = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.medium};
`;

const ErrorMessage = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.medium};
`;

const EmptyMessage = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.medium};
`;
