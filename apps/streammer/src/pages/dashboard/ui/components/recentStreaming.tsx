import React from 'react';
import styled from 'styled-components';
import { RecentStreamCard } from './recentStreamCard';

export interface StreamItem {
  id: string;
  title: string;
  date: string;
}

interface RecentStreamingProps {
  streams: StreamItem[];
  onViewStream: (id: string) => void;
}

export const RecentStreaming: React.FC<RecentStreamingProps> = (props: RecentStreamingProps) => {
  return (
    <StreamingContainer>
      <SectionTitle>최근 스트리밍 라이브</SectionTitle>
      <StreamList>
        {props.streams.map(stream => (
          <RecentStreamCard 
            key={stream.id} 
            title={stream.title} 
            date={stream.date}
            onViewClick={() => props.onViewStream(stream.id)}
          />
        ))}
      </StreamList>
    </StreamingContainer>
  );
};

const StreamingContainer = styled.div`
  grid-column: 1 / 3;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-column: 1;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0 0 16px 0;
`;

const StreamList = styled.div`
  display: flex;
  flex-direction: column;
`;
