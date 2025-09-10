import React from 'react';
import styled from 'styled-components';

interface RecentStreamCardProps {
  title: string;
  date: string;
  onViewClick: () => void;
}

export const RecentStreamCard: React.FC<RecentStreamCardProps> = ({
  title,
  date,
  onViewClick
}) => {
  return (
    <StreamCardContainer>
      <StreamCardInfo>
        <StreamTitle>{title}</StreamTitle>
        <StreamDate>{date}</StreamDate>
      </StreamCardInfo>
      <ViewButton onClick={onViewClick}>다시보기</ViewButton>
    </StreamCardContainer>
  );
};

const StreamCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
`;

const StreamCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StreamTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const StreamDate = styled.p`
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin: 0;
`;

const ViewButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  border: none;
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 8px 16px;
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;
