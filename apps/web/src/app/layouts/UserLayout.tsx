import { DefaultLayout } from "@pang/shared/ui";
import { FollowingCard } from "@pang/shared/ui";
import { useMyFollowing } from "@/features/follow/hooks/useFollow";
import { useNavigate } from "react-router-dom";

interface UserLayoutProps {
  full?: boolean;
}

export const UserLayout = ({ full }: UserLayoutProps) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { data: followingData } = useMyFollowing(username || undefined);

  return (
    <DefaultLayout type="user" full={full}>
      {followingData?.data?.map((following) => (
        <FollowingCard
          key={following.username}
          profileImage={following.image}
          nickname={following.nickname}
          followerCount={following.follower}
          onClick={() => navigate(`/profile/${following.username}`)}
        />
      ))}
    </DefaultLayout>
  );
};

