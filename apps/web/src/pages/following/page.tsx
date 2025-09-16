import { FollowingCard } from "@/features/follow/ui/following-card";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { useFollowing } from "./hooks/useFollowing";
import styled from "styled-components";

export const Following = () => {
  const { following } = useFollowing();

  if (following == null) {
    return <div>로딩 중...</div>
  }
  
  return (
    <FollowingContainer>
      <TabTitleText>팔로잉</TabTitleText>

      {following.length === 0 ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          color: "#a3a3a3",
          fontSize: "16px"
        }}>
          팔로잉이 없습니다
        </div>
      ) : (
        <FollowingCardWrapper>
          {following.map((f, index) => (
            <FollowingCard
              key={index}
              streamerName={f.nickname}
              followerCount={f.follower}
            />
          ))}
        </FollowingCardWrapper>
      )}
    </FollowingContainer>
  );
};

const FollowingContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`

const FollowingCardWrapper = styled.div`
    margin-top: 30px;
		display: flex;
		gap: 40px
`