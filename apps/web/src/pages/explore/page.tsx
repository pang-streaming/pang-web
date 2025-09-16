import { TabTitleText } from "@/shared/ui/tab-title-text";
import * as S from "./style";
import { Segment, SegmentButtonGroup } from "@pang/shared/ui";
import { VideoList } from "@/shared/ui/video/video-list";
import { useVideoList } from "../home/hooks/use-video-list";

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
  const { liveVideos, isLoading, error } = useVideoList();
  
  // 테스트용으로 비디오 데이터 복제
  const testVideos = [...liveVideos, ...liveVideos, ...liveVideos];
  
  if (isLoading) {
    return (
      <S.Container>
        <S.EmptyStateContainer>
          <S.EmptyStateTitle>방송을 불러오는 중...</S.EmptyStateTitle>
        </S.EmptyStateContainer>
      </S.Container>
    );
  }
  if (error) {
    return (
      <S.Container>
        <S.EmptyStateContainer>
          <S.EmptyStateTitle>오류가 발생했습니다</S.EmptyStateTitle>
          <S.EmptyStateMessage>{error}</S.EmptyStateMessage>
        </S.EmptyStateContainer>
      </S.Container>
    );
  }
  return (
    <S.ExploreContainer>
      <TabTitleText>탐색</TabTitleText>
      <S.SegmentHeader>
        <SegmentButtonGroup segments={segments} />
      </S.SegmentHeader>

      {testVideos.length === 0 ? (
        <S.Container>
          <S.EmptyStateContainer>
            <S.EmptyStateTitle>
              현재 진행 중인 방송이 없습니다
            </S.EmptyStateTitle>
            <S.EmptyStateMessage>
              새로운 방송이 시작되면 여기에 표시됩니다
            </S.EmptyStateMessage>
          </S.EmptyStateContainer>
        </S.Container>
      ) : (
        <VideoList videos={testVideos} />
      )}
    </S.ExploreContainer>
  );
};
