import { useState, useCallback } from "react";
import { fetchMyFollowing, fetchMyFollower, followingOtherUser } from "../api";
import type { FollowResponse } from "../model/type";

export const useFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMyFollowing = useCallback(async (username: string): Promise<FollowResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchMyFollowing(username);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "팔로잉 목록을 불러오는데 실패했습니다.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyFollower = useCallback(async (username: string): Promise<FollowResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchMyFollower(username);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "팔로워 목록을 불러오는데 실패했습니다.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const followUser = useCallback(async (username: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await followingOtherUser(username);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "팔로우에 실패했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getMyFollowing,
    getMyFollower,
    followUser,
  };
};
