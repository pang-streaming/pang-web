import { FollowingCard } from "@/features/follow/ui/following-card";
import { TabTitleText } from "@/shared/ui/tab-title-text";

export const Following = () => {
  return (
    <div>
      <TabTitleText>팔로잉</TabTitleText>
      
      <div style={{display:'flex', gap: 40}}>
      <FollowingCard streamerName="대듀" followerCount={10} />
      <FollowingCard streamerName="상은" followerCount={10} />
      <FollowingCard streamerName="기찬" followerCount={10} />
      </div>
    </div>
  );
};
