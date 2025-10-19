import { useTransaction } from "@/entities/transaction/hooks/useTransaction";
import styled from "styled-components";
import { Transaction, BalanceData } from "@/entities/transaction/model/type";
import { TransactionSkeleton } from "@/shared/ui/skeleton";
import { ErrorScreen } from "@/shared/ui/error-screen";

interface ListHeaderProps {
  segmentType: string;
}

export const ListHeader = ({ segmentType }: ListHeaderProps) => {
  const isUseSegment = segmentType === "use";
  const { data, isError, isLoading, error } = useTransaction();

  const transactionList =
    data?.data?.transactions?.filter((tx: Transaction) =>
      isUseSegment ? tx.type === "USE" : tx.type === "CHARGE"
    ) || [];

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
        <EmptyMessage>
          {isUseSegment ? "사용 내역이 없습니다" : "충전 내역이 없습니다"}
        </EmptyMessage>
      </Container>
    );
  }

  return (
    <TransactionContainer>
      <HeaderContainer>
        <HeaderItem $ratio={2}>
          {isUseSegment ? "사용일시" : "충전일시"}
        </HeaderItem>
        <HeaderItem $ratio={1}>
          {isUseSegment ? "사용수량" : "충전수량"}
        </HeaderItem>
        <HeaderItem $ratio={1}>
          {isUseSegment ? "사용내용" : "충전내용"}
        </HeaderItem>
        <HeaderItem $ratio={2}>
          {isUseSegment ? "사용채널" : "충전채널"}
        </HeaderItem>
        <HeaderItem $ratio={3}>
          {isUseSegment ? "후원메시지" : "충전메시지"}
        </HeaderItem>
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
            {tx.type === "USE" ? "사용" : "충전"}
          </TransactionItem>
          <TransactionItem $ratio={2}>{tx.description || "-"}</TransactionItem>
          <TransactionItem $ratio={3}>{tx.description || "-"}</TransactionItem>
        </TransactionRow>
      ))}
    </TransactionContainer>
  );
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
