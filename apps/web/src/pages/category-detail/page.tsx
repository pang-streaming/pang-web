import styled from "styled-components";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { Segment, SegmentButtonGroup } from "@pang/shared/ui";
import { ChipList } from "@/shared/ui/chip/chip-list";
import { Chip } from "@/entities/chip/model/type";
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

const chips: Chip[] = [
  {
    id: "1",
    name: "배틀그라운드",
    type: "main",
  },
  {
    id: "2",
    name: "팡페스티벌",
    type: "special",
  },
  {
    id: "3",
    name: "치지직",
    type: "normal",
  },
];

export const CategoryDetail = () => {
  const { liveVideos, isLoading, error } = useVideoList();

  if (isLoading) {
    return (
      <CategoryDetailContainer>
        <TabTitleText>카테고리</TabTitleText>
        <CategoryBoxWrapper>
          <CategoryThumbnail src="/category-images/forza.webp" />
          <CategoryInfoWrapper>
            <Title>포르자 호라이즌 5</Title>
            <CategoryInfo>시청자 24명 · 라이브 1개</CategoryInfo>
            <ChipList chips={chips} />
          </CategoryInfoWrapper>
        </CategoryBoxWrapper>
        <SegmentHeader>
          <SegmentButtonGroup segments={segments} />
        </SegmentHeader>
        <EmptyStateTitle>
          방송을 불러오는 중...
        </EmptyStateTitle>
      </CategoryDetailContainer>
    );
  }

  if (error) {
    return (
      <CategoryDetailContainer>
        <TabTitleText>카테고리</TabTitleText>
        <CategoryBoxWrapper>
          <CategoryThumbnail src="/category-images/forza.webp" />
          <CategoryInfoWrapper>
            <Title>포르자 호라이즌 5</Title>
            <CategoryInfo>시청자 24명 · 라이브 1개</CategoryInfo>
            <ChipList chips={chips} />
          </CategoryInfoWrapper>
        </CategoryBoxWrapper>
        <SegmentHeader>
          <SegmentButtonGroup segments={segments} />
        </SegmentHeader>
        <EmptyStateTitle>
          오류가 발생했습니다: {error}
        </EmptyStateTitle>
      </CategoryDetailContainer>
    );
  }

  return (
    <CategoryDetailContainer>
      <TabTitleText>카테고리</TabTitleText>
      <CategoryBoxWrapper>
        <CategoryThumbnail src="/category-images/forza.webp" />
        <CategoryInfoWrapper>
          <Title>포르자 호라이즌 5</Title>
          <CategoryInfo>시청자 24명 · 라이브 1개</CategoryInfo>
          <ChipList chips={chips} />
        </CategoryInfoWrapper>
      </CategoryBoxWrapper>
      <SegmentHeader>
        <SegmentButtonGroup segments={segments} />
      </SegmentHeader>
      {liveVideos.length === 0 ? (
        <EmptyStateTitle>현재 진행 중인 방송이 없습니다</EmptyStateTitle>
      ) : (
        <VideoList videos={liveVideos} />
      )}
    </CategoryDetailContainer>
  );
};

const CategoryDetailContainer = styled.div`
  width: 100%;
  gap: 12px;
`;

const EmptyStateTitle = styled.div`
padding: 40px;
  text-align: center;
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const SegmentHeader = styled.div`
  box-sizing: border-box;
  position: sticky;
  top: 67px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CategoryThumbnail = styled.img`
  border-radius: ${({ theme }) => theme.borders.medium};
  width: 150px;
  aspect-ratio: 41 / 56;
  background-color: ${({ theme }) => theme.colors.content.normal};
`;

const CategoryBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  justify-content: start;
`;

const CategoryInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 20px 10px;
  gap: 10px;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.font.xxxLarge};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: bold;
`;

const CategoryInfo = styled.span`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-weight: bold;
  font-size: ${({ theme }) => theme.font.medium};
`;
