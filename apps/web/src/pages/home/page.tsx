import * as S from "./style";
import { HeaderVideo } from "@/entities/video/ui/header-video";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { useVideoList } from "./hooks/use-video-list";
import { VideoList } from "@/shared/ui/video/video-list";


export const Home = () => {
  const { liveVideos, isLoading, error } = useVideoList();


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

  if (liveVideos.length === 0) {
    return (
      <S.Container>
        <S.EmptyStateContainer>
          <S.EmptyStateTitle>현재 진행 중인 방송이 없습니다</S.EmptyStateTitle>
          <S.EmptyStateMessage>새로운 방송이 시작되면 여기에 표시됩니다</S.EmptyStateMessage>
        </S.EmptyStateContainer>
      </S.Container>
    );
  }

  const headerVideos = liveVideos.slice(0, 3);
  const listVideos = liveVideos.slice(3);

  return (
    <S.Container>
      {headerVideos.length > 0 && <HeaderVideo videos={headerVideos} />}
      {listVideos.length > 0 && (
        <>
          <TabTitleText>이 방송 어때요?</TabTitleText>
          <VideoList videos={listVideos} />
        </>
      )}
      {headerVideos.length > 0 && listVideos.length === 0 && (
        <>
          <TabTitleText>이 방송 어때요?</TabTitleText>
          <S.EmptyStateContainer>
            <S.EmptyStateMessage>더 많은 방송을 기다려주세요</S.EmptyStateMessage>
          </S.EmptyStateContainer>
        </>
      )}
    </S.Container>
  );
};
