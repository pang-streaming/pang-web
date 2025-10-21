  import styled from "styled-components";
  import { TabTitleText } from "@/shared/ui/tab-title-text";
  import { Segment, SegmentButtonGroup } from "@pang/shared/ui";
  import { ChipList } from "@/shared/ui/chip/chip-list";
  import { Chip } from "@/entities/chip/model/type";
  import { VideoList } from "@/shared/ui/video/video-list";
  import { useLocation, useParams } from "react-router-dom";
  import { useCategoryLives, useCategoryVideos } from "../category/hook/useCategory";
  import { useState } from "react";
  import { Category } from "../category/model/category";

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

  export const CategoryDetail = () => {
    const location = useLocation();
    const { categoryId } = useParams<{ categoryId: string }>();
    const [activeTab, setActiveTab] = useState<string>("live");
    
    
    const category: Category | undefined = location.state?.category;
    const categoryTitle = category?.name || "카테고리";
    
    const { data: categoryLivesData, isLoading: livesLoading, error: livesError } = useCategoryLives(categoryId);
    const { data: categoryVideosData, isLoading: videosLoading, error: videosError } = useCategoryVideos(categoryId);
    
    const categoryLives = categoryLivesData?.data || [];
    const lives = categoryLives.map(live => ({
      streamId: live.streamId,
      title: live.title,
      url: live.url,
      userId: live.username,
      username: live.username,
      nickname: live.nickname,
      profileImage: live.profileImage,
      followers: live.viewCount || 0,
    }));

    const categoryVideos = categoryVideosData?.data || [];
    const videos = categoryVideos.map(video => ({
      streamId: video.streamId,
      title: video.title,
      url: video.url,
      userId: video.username,
      username: video.username,
      nickname: video.nickname,
      profileImage: video.profileImage,
      followers: video.viewCount || 0,
    }));

    const isLoading = activeTab === "live" ? livesLoading : videosLoading;
    const error = activeTab === "live" ? livesError : videosError;

    if (isLoading) {
      return (
        <CategoryDetailContainer>
          <ErrorStateTitle>방송을 불러오는 중...</ErrorStateTitle>
        </CategoryDetailContainer>
      );
    }

    if (error) {
      return (
        <CategoryDetailContainer>
          <SegmentHeader>
            <SegmentButtonGroup segments={segments} onSegmentChange={setActiveTab} />
          </SegmentHeader>
          <ErrorStateTitle>오류가 발생했습니다: {String(error)}</ErrorStateTitle>
        </CategoryDetailContainer>
      );
    }


    return (
      <CategoryDetailContainer>
        {category && (
          <CategoryBoxWrapper>
            <CategoryThumbnail src={category.postImage} />
            <CategoryInfoWrapper>
              <Title>{category.name}</Title>
              <CategoryInfo>시청자 {category.streamCount}명</CategoryInfo>
              {category.chip && Array.isArray(category.chip) && category.chip.length > 0 && (
                <ChipList
                  chips={category.chip.map((tag: string) => ({
                    id: tag,
                    name: tag,
                    type: "normal" as const,
                  }))}
                />
              )}
            </CategoryInfoWrapper>
          </CategoryBoxWrapper>
        )}
        <SegmentHeader>
          <SegmentButtonGroup segments={segments} onSegmentChange={setActiveTab} />
        </SegmentHeader>
        
        {activeTab === "live" && (
          lives.length === 0 ? (
            <ErrorStateTitle>현재 진행 중인 라이브 방송이 없습니다</ErrorStateTitle>
          ) : (
            <VideoList videos={lives} />
          )
        )}
        
        {activeTab === "video" && (
          videos.length === 0 ? (
            <ErrorStateTitle>등록된 동영상이 없습니다</ErrorStateTitle>
          ) : (
            <VideoList videos={videos} />
          )
        )}
      </CategoryDetailContainer>
    );
  };

  const CategoryDetailContainer = styled.div`
    width: 100%;
    gap: 12px;
  `;

  const ErrorStateTitle = styled.div`
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
    width: 250px;
    object-fit: cover;
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
