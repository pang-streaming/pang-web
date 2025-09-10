import { FollowingCard } from "@/features/follow/ui/following-card";
import React from "react";

export const Following = () => {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <FollowingCard streamerName="대듀" followerCount={10} />
      <FollowingCard streamerName="상은" followerCount={10} />
      <FollowingCard streamerName="기찬" followerCount={10} />
    </div>
  );
};
