import { TabTitleText } from "@/shared/ui/tab-title-text";
import * as S from "./style";
import { Segment, SegmentButtonGroup } from "@pang/shared/ui";
import { VideoList } from "@/shared/ui/video/video-list";
import { SkeletonGrid } from "@/shared/ui/skeleton";
import { ErrorScreen } from "@/shared/ui/error-screen";
import { useLives } from "@/entities/video/hooks/useLive";
import { useAllLastVideo } from "@/entities/last-video/useLastVideo";
import { useState } from "react";

const segments: Segment[] = [
  {
    id: "live",
    name: "라이브",
  },
  {
    id: "video",
    name: "동영상",
  },
];

export const Explore = () => {
  const [activeTab, setActiveTab] = useState<string>("live");
  const { data: lives = [], isLoading: livesLoading, error: livesError } = useLives();
  const { data: lastVideosResponse, isLoading: videosLoading, error: videosError } = useAllLastVideo();

  const lastVideos = (lastVideosResponse?.data || []).map(video => ({
    streamId: video.streamId,
    title: video.title,
    url: video.url,
    userId: video.username,
    username: video.username,
    nickname: video.nickname,
    profileImage: video.profileImage,
    followers: video.viewCount || 0,
    viewCount: video.viewCount || 0,
    thumbnail: video.thumbnail || video.url,
  }));

  const isLoading = activeTab === "live" ? livesLoading : videosLoading;
  const error = activeTab === "live" ? livesError : videosError;
  const displayVideos = activeTab === "live" ? lives : lastVideos;

  if (isLoading) {
    return (
      <S.ExploreContainer>
        <TabTitleText>탐색</TabTitleText>
        <S.SegmentHeader>
          <SegmentButtonGroup segments={segments} onSegmentChange={setActiveTab} />
        </S.SegmentHeader>

        <SkeletonGrid count={3} minWidth={420} itemHeight={240} />
      </S.ExploreContainer>
    );
  }

  if (error) {
    return (
      <ErrorScreen error={String(error)}/>
    );
  }

  return (
    <S.ExploreContainer>
      <TabTitleText>탐색</TabTitleText>
      <S.SegmentHeader>
        <SegmentButtonGroup segments={segments} onSegmentChange={setActiveTab} />
      </S.SegmentHeader>

      {displayVideos.length === 0 ? (
        <S.Container>
          <S.ErrorStateContainer>
            <S.ErrorStateTitle>
              {activeTab === "live" ? "현재 진행 중인 방송이 없습니다" : "등록된 동영상이 없습니다"}
            </S.ErrorStateTitle>
            <S.ErrorStateMessage>
              {activeTab === "live" 
                ? "새로운 방송이 시작되면 여기에 표시됩니다" 
                : "새로운 동영상이 업로드되면 여기에 표시됩니다"}
            </S.ErrorStateMessage>
          </S.ErrorStateContainer>
        </S.Container>
      ) : (
        <VideoList videos={displayVideos} />
      )}
    </S.ExploreContainer>
  );
};
