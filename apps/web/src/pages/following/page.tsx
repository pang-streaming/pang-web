import { FollowingCard } from "@/features/follow/ui/following-card";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { useMyFollowing } from "@/features/follow/hooks/useFollow";
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@/entities/user/api/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FollowingCardSkeleton, SkeletonGrid } from "@/shared/ui/skeleton";

import { ErrorStateTitle } from "@/shared/ui/error-screen";
import { VideoList } from "@/shared/ui/video/video-list";
import { useFollowingLives } from "@/entities/video/hooks/useLive";
import { formattedPrice } from "../market/util/formatted-price";

export const Following = () => {
  const navigate = useNavigate();
  const { data: myInfo, isLoading: isMyInfoLoading } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
  });
  const username = myInfo?.data?.username;

  const { data: followingData, isLoading, isError } = useMyFollowing(username);
  const { data: followingLives, error } = useFollowingLives();

  const following = followingData?.data || [];
  const lives = followingLives || [];

  if (isLoading || isMyInfoLoading)
    return (
      <FollowingContainer>
        <TabTitleText>팔로잉</TabTitleText>
        <FollowingCardSkeleton />

        <TabTitleText>라이브</TabTitleText>
        <SkeletonGrid count={3} minWidth={420} itemHeight={240} />

        <TabTitleText>최근 동영상</TabTitleText>
        <SkeletonGrid count={3} minWidth={420} itemHeight={240} />

      </FollowingContainer>
    );

  if (isError) return <div>팔로잉 정보를 불러오는데 실패했습니다.</div>;

  return (
    <FollowingContainer>
      <TabTitleText>팔로잉</TabTitleText>

      {following.length === 0 ? (
        <ErrorStateTitle>팔로잉이 없습니다</ErrorStateTitle>

      ) : (
        <FollowingCardWrapper>
          {following.map((f, index) => (
            <div key={index} onClick={() => navigate(`/profile/${f.username}`)}>
              <FollowingCard
                profileImage={f.image}
                streamerName={f.nickname}
                followerCount={formattedPrice(f.follower)}
              />
            </div>
          ))}
        </FollowingCardWrapper>
      )}

      <TabTitleText>라이브</TabTitleText>
      {lives.length === 0 ? (
        <ErrorStateTitle>현재 진행 중인 방송이 없습니다</ErrorStateTitle>
      ) : (
        <VideoList videos={lives} />
      )}

      <TabTitleText>최근 동영상</TabTitleText>
      {lives.length === 0 ? (
        <ErrorStateTitle>진행한 방송이 없습니다</ErrorStateTitle>
      ) : (
        <VideoList videos={lives} />
      )}
    </FollowingContainer>
  );
};

const FollowingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const FollowingCardWrapper = styled.div`
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 4px;
`;

const EmptyText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  color: #a3a3a3;
  font-size: 16px;
`;
