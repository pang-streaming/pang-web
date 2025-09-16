import { useEffect, useState } from "react";
import { fetchMyFollower, fetchMyFollowing, followingOtherUser } from "@/features/follow/api";
import { fetchMyInfo } from "@/entities/user/api/api";

export function useFollowInfo(nickname?: string) {
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!nickname) return;
    const fetchFollowerCount = async () => {
      try {
        const res = await fetchMyFollower(nickname);
        setFollowerCount(res.data.length);
      } catch (err) {
        console.error("팔로워 수 가져오기 실패", err);
        setFollowerCount(0);
      }
    };
    fetchFollowerCount();
  }, [nickname]);

  useEffect(() => {
    if (!nickname) return;
    const checkIfFollowing = async () => {
      try {
        const myInfo = await fetchMyInfo();
        const myUsername = myInfo.data.username;
        const res = await fetchMyFollowing(myUsername);
        const following = res.data.some((user) => user.nickname === nickname);
        setIsFollowing(following);
      } catch (err) {
        console.error("팔로우 여부 확인 실패", err);
      }
    };
    checkIfFollowing();
  }, [nickname]);

  const toggleFollow = async () => {
    if (!nickname || isLoading) return;
    setIsLoading(true);
    try {
      await followingOtherUser(nickname);
      setIsFollowing((prev) => !prev);
    } catch (err) {
      console.error("팔로우 실패", err);
      alert("팔로우 요청에 실패했어요. 잠시 후 다시 시도해 주세요!");
    } finally {
      setIsLoading(false);
    }
  };

  return { followerCount, isFollowing, isLoading, toggleFollow };
}


