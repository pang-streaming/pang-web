import { FollowingCard } from "@/features/follow/ui/following-card";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { useFollow } from "@/features/follow/hooks/useFollow";
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo } from "@/entities/user/api/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import type { FollowResponse } from "@/features/follow/model/type";
import { useNavigate } from "react-router-dom";

export const Following = () => {
  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
  });
  const navigate=  useNavigate();
  
  const { loading, getMyFollowing } = useFollow();
  const [followingData, setFollowingData] = useState<FollowResponse | null>(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (!myInfo?.data?.username) return;
      const data = await getMyFollowing(myInfo.data.username);
      setFollowingData(data);
    };
    fetchFollowing();
  }, [myInfo?.data?.username, getMyFollowing]);

  if (loading) {
    return <div>로딩 중...</div>
  }
  
  const following = followingData?.data || [];
  
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
        <FollowingCardWrapper onClick={() => {
          navigate('/profile/jiyun')
        }}>
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
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 16px;

	@media (min-width: 768px) {
		padding: 0 24px;
	}

	@media (min-width: 1200px) {
		padding: 0 32px;
	}
`

const FollowingCardWrapper = styled.div`
	margin-top: 30px;
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	gap: 16px;

	@media (min-width: 480px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
	}

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
	}

	@media (min-width: 1200px) {
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 28px;
	}
`