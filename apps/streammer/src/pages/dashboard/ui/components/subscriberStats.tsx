import React from 'react';
import styled from 'styled-components';

interface SubscriberStatsProps {
  totalCount: number;
  increasedCount: number;
}

export const SubscriberStats: React.FC<SubscriberStatsProps> = (props: SubscriberStatsProps) => {
  return (
    <StatsContainer>
      <StatsHeader>
        <StatsIcon />
        <StatsTitle>구독자 현황</StatsTitle>
      </StatsHeader>
      <CountDisplay>
        <TotalCount>{props.totalCount.toLocaleString()}</TotalCount>
        <CountTag>총 구독자</CountTag>
      </CountDisplay>
      <IncreasedInfo>
        <IncreasedCount>+{props.increasedCount}</IncreasedCount>
        <IncreasedText>이번 주 신규</IncreasedText>
      </IncreasedInfo>
    </StatsContainer>
  );
};

const StatsIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  background-image: url('/subscriberStats.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 24px;
`;

const StatsTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const CountDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const TotalCount = styled.span`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const CountTag = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin-top: 4px;
`;

const IncreasedInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 12px;
`;

const IncreasedCount = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.normal};
`;

const IncreasedText = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.primary.normal};
`;
