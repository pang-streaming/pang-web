import { TabTitleText } from "@/shared/ui/tab-title-text";
import * as S from "./style";
import { Segment, SegmentButtonGroup } from "@pang/shared/ui";
import { VideoList } from "@/shared/ui/video/video-list";
import { SkeletonGrid } from "@/shared/ui/skeleton";
import { ErrorScreen } from "@/shared/ui/error-screen";
import { useLives } from "@/entities/video/hooks/useLive";

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
  const { data: lives = [], isLoading, error } = useLives();

  const testVideos = [...lives, ...lives, ...lives];

  if (isLoading) {
    return (
      <S.ExploreContainer>
        <TabTitleText>탐색</TabTitleText>
        <S.SegmentHeader>
          <SegmentButtonGroup segments={segments} />
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
        <SegmentButtonGroup segments={segments} />
      </S.SegmentHeader>

      {testVideos.length === 0 ? (
        <S.Container>
          <S.ErrorStateContainer>
            <S.ErrorStateTitle>현재 진행 중인 방송이 없습니다</S.ErrorStateTitle>
            <S.ErrorStateMessage>
              새로운 방송이 시작되면 여기에 표시됩니다
            </S.ErrorStateMessage>
          </S.ErrorStateContainer>
        </S.Container>
      ) : (
        <VideoList videos={testVideos} />
      )}
    </S.ExploreContainer>
  );
};
