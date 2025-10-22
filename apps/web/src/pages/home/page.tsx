
import { useLives } from "@/entities/video/hooks/useLive";
import * as S from "./style";
import { HeaderVideo } from "@/entities/video/ui/header-video";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { VideoList } from "@/shared/ui/video/video-list";
import { ErrorScreen } from "@/shared/ui/error-screen";
import { SkeletonGrid } from "@/shared/ui/skeleton";


export const Home = () => {
  const { data: lives = [], isLoading, error } = useLives();


  if (isLoading) {
    return (
      <div>
        <SkeletonGrid columns={3} itemHeight={300} />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorScreen error={String(error)}/>
    );
  }

  if (lives.length === 0) {
    return (
      <S.Container>
        <S.ErrorStateContainer>
          <S.ErrorStateTitle>현재 진행 중인 방송이 없습니다</S.ErrorStateTitle>
          <S.ErrorStateMessage>새로운 방송이 시작되면 여기에 표시됩니다</S.ErrorStateMessage>
        </S.ErrorStateContainer>
      </S.Container>
    );
  }

  const headerVideos = lives.slice(0, 3);
  const listVideos = lives.slice(0);

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
          <S.ErrorStateContainer>
            <S.ErrorStateMessage>더 많은 방송을 기다려주세요</S.ErrorStateMessage>
          </S.ErrorStateContainer>
        </>
      )}
    </S.Container>
  );
};
