import React from 'react';
import { RecentStreaming } from './components/recentStreaming';
import type { StreamItem } from './components/recentStreaming';
import { SubscriberStats } from './components/subscriberStats';
import { PangCommunity } from './components/pangCommunity';
import { Notifications } from './components/notifications';
import { VideoUpload } from './components/videoUpload';
import styled from 'styled-components';

const DashboardPage: React.FC = () => {
  
  // 더미
  const recentStreams: StreamItem[] = [
    { id: '1', title: '대듀의 배틀그라운드', date: '2025.04.01' },
    { id: '2', title: '대듀의 리그오브레전드', date: '2025.04.01' }
  ];
  
  const pangCommunityMessages = [
    { id: '1', content: '여러분 저 영구정지 당했어요', date: '2025-04-01' },
    { id: '2', content: '대듀 버츄얼 깜짝 얼골 해명', date: '2025-04-01' },
    { id: '3', content: '여러분 대듀입니다.', date: '2025-04-01' },
    { id: '4', content: '여러분 후원 부탁드려요', date: '2025-04-01' },
    { id: '5', content: '대듀업이 필요합니다.', date: '2025-04-01' }
  ];
  
  const notificationItems = [
    { id: '1', title: '스트리머 대듀 영구정지 사항', date: '2025-04-01' },
    { id: '2', title: '영구정지 항목 업데이트 안내', date: '2025-04-01' }
  ];
  
  const handleViewStream = (id: string) => {
    console.log(`스트림 ${id} 보기`);
  };
  
  const handleUploadClick = () => {
    console.log('동영상 업로드');
  };

  return (
    <PageContainer>
      <DashboardContainer>
        <RecentStreamingSection>
          <RecentStreaming 
            streams={recentStreams} 
            onViewStream={handleViewStream} 
          />
        </RecentStreamingSection>
        
        <SubscriberStatsSection>
          <SubscriberStats 
            totalCount={15234} 
            increasedCount={127} 
          />
        </SubscriberStatsSection>
        
        <NotificationsSection>
          <Notifications 
            notifications={notificationItems}
          />
        </NotificationsSection>
        
        <PangCommunitySection>
          <PangCommunity 
            messages={pangCommunityMessages}
          />
        </PangCommunitySection>
        
        <UploadSection>
          <VideoUpload 
            onUploadClick={handleUploadClick}
          />
        </UploadSection>
      </DashboardContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 66px);
  padding-top: 16px;
  padding-bottom: 16px;
`;

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "recent notices"
    "stats community"
    "upload community";
  gap: 20px;
  padding: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "recent"
      "stats"
      "notices"
      "upload"
      "community";
  }
`;

const RecentStreamingSection = styled.div`
  grid-column: 1;
  grid-row: 1;
  grid-area: recent;
`;

const SubscriberStatsSection = styled.div`
  grid-area: stats;
`;

const NotificationsSection = styled.div`
  grid-area: notices;
`;

const PangCommunitySection = styled.div`
  grid-area: community;
`;

const UploadSection = styled.div`
  grid-area: upload;
`;

export default DashboardPage;