import { FC } from 'react';
import * as S from './revenue.style';

interface RevenueData {
  totalAmount: string;
  increasePct: number;
  broadcastAmount: string;
  monthlyAmount: string;
  fundingAmount: string;
}

interface PangHistoryItem {
  username: string;
  date: string;
  amount: string;
}

interface MembershipHistoryItem {
  username: string;
  date: string;
  duration: string;
}

interface TierData {
  name: string;
  price: string;
}

export const RevenuePage: FC = () => {
  const revenueData: RevenueData = {
    totalAmount: '₩2,450,000',
    increasePct: 12.5,
    broadcastAmount: '₩1,250,000',
    monthlyAmount: '₩850,000',
    fundingAmount: '₩1,250,000'
  };

  const pangHistory: PangHistoryItem[] = Array(4).fill(0).map(() => ({
    username: '대두콩',
    date: '2025.04.01',
    amount: '10,000원'
  }));

  const membershipHistory: MembershipHistoryItem[] = [
    { username: '대두콩', date: '2025.04.01', duration: '2개월' },
    { username: '대두콩', date: '2025.04.01', duration: '1개월' },
    { username: '대두콩', date: '2025.04.01', duration: '20개월' },
    { username: '대두콩', date: '2025.04.01', duration: '1개월' }
  ];

  const tierData: TierData[] = [
    { name: '티어 1', price: '₩5,000/월' },
    { name: '티어 2', price: '₩10,000/월' },
    { name: '티어 3', price: '₩20,000/월' }
  ];

  return (
    <S.RevenueContainer>
      <S.Section>
        <S.SectionTitle>월간 수익 현황</S.SectionTitle>
        <S.RevenueGrid>
          <S.RevenueCard wide>
            <S.RevenueLabel>이번 달 총 수익</S.RevenueLabel>
            <S.RevenueLarge>{revenueData.totalAmount}</S.RevenueLarge>
            <S.RevenueChange positive={revenueData.increasePct > 0}>
              전월 대비 +{revenueData.increasePct}%
            </S.RevenueChange>
          </S.RevenueCard>
          <S.RevenueCard>
            <S.RevenueLabel>멤버십 수익</S.RevenueLabel>
            <S.RevenueAmount>{revenueData.broadcastAmount}</S.RevenueAmount>
          </S.RevenueCard>
          <S.RevenueCard>
            <S.RevenueLabel>팡</S.RevenueLabel>
            <S.RevenueAmount>{revenueData.monthlyAmount}</S.RevenueAmount>
          </S.RevenueCard>
          <S.RevenueCard>
            <S.RevenueLabel>광고 수익</S.RevenueLabel>
            <S.RevenueAmount>{revenueData.fundingAmount}</S.RevenueAmount>
          </S.RevenueCard>
          <S.EmptyCard />
        </S.RevenueGrid>
      </S.Section>

      <S.Section>
        <S.SectionTitle>수익 설정</S.SectionTitle>
        <S.TwoColumnLayout>
          <div>
            <S.SubTitle>멤버십 티어 설정</S.SubTitle>
            <S.TierList>
              {tierData.map((tier, index) => (
                <S.TierItem key={index}>
                  <S.TierName>{tier.name}</S.TierName>
                  <S.TierPrice>{tier.price}</S.TierPrice>
                </S.TierItem>
              ))}
            </S.TierList>
          </div>
          <div>
            <S.SubTitle>도네이션 설정</S.SubTitle>
            <S.DonationSettings>
              <S.SettingItem>
                <S.SettingLabel>최소금액</S.SettingLabel>
                <S.SettingValue>1,000원</S.SettingValue>
              </S.SettingItem>
            </S.DonationSettings>
          </div>
        </S.TwoColumnLayout>
      </S.Section>

      <S.Section>
        <S.SectionTitle>팡 내역</S.SectionTitle>
        <S.HistoryList>
          {pangHistory.map((item, index) => (
            <S.HistoryItem key={index}>
              <S.HistoryTitle>{item.username}</S.HistoryTitle>
              <S.HistoryDate>{item.date}</S.HistoryDate>
              <S.HistoryAmount>{item.amount}</S.HistoryAmount>
            </S.HistoryItem>
          ))}
        </S.HistoryList>
      </S.Section>

      <S.Section>
        <S.SectionTitle>멤버십 내역</S.SectionTitle>
        <S.HistoryList>
          {membershipHistory.map((item, index) => (
            <S.HistoryItem key={index}>
              <S.HistoryTitle>{item.username}</S.HistoryTitle>
              <S.HistoryDate>{item.date}</S.HistoryDate>
              <S.HistoryDuration>{item.duration}</S.HistoryDuration>
            </S.HistoryItem>
          ))}
        </S.HistoryList>
      </S.Section>
    </S.RevenueContainer>
  );
};

