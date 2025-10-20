
import { useRecentLives } from "@/entities/video/hooks/useLive";
import { SkeletonGrid } from "@/shared/ui/skeleton";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { VideoList } from "@/shared/ui/video/video-list";
import { Loading } from "@/widgets/fall-back";
import React from "react";
import styled from "styled-components";

export const RecentVideo = () => {
  const { data: recentVideos, isLoading } = useRecentLives();

  if (isLoading) {
    return (
      <div>
      <TabTitleText>최근 시청한 영상</TabTitleText>
      <SkeletonGrid count={3} minWidth={420} itemHeight={240} />

      </div>
    )
  }

  const videos = recentVideos ?? [];

  return (
    <Container>
      <TabTitleText>최근 시청한 영상</TabTitleText>

      {videos.length === 0 ? (
        <EmptyVideoTitle>최근 시청한 영상이 없습니다.</EmptyVideoTitle>
      ) : (
        <VideoList videos={videos} />
      )}
    </Container>
  );
};

const Container = styled.div`
   width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
`
const EmptyVideoTitle = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;
