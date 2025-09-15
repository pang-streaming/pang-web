import { FollowingCard } from "@/features/follow/ui/following-card";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import styled from "styled-components";

export const Following = () => {
  return (
    <FollowingContainer>
      <TabTitleText>팔로잉</TabTitleText>
      
      <FollowingCardWrapper>
      <FollowingCard streamerName="대듀" followerCount={10} />
      <FollowingCard streamerName="상은" followerCount={10} />
      <FollowingCard streamerName="기찬" followerCount={10} />
      </FollowingCardWrapper>
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