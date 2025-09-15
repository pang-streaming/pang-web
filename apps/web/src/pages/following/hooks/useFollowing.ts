import { useState, useEffect } from "react";
import { fetchMyInfo } from "@/entities/user/api/api";
import { fetchMyFollowing } from "@/features/follow/api";
import { User } from "@/entities/user/model/type";
import { Follow } from "@/features/follow/model/type";

export const useFollowing = () => {
  const [user, setUser] = useState<User>();
  const [following, setFollowing] = useState<Follow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const resUser = await fetchMyInfo();
        setUser(resUser.data);

        const resFollowing = await fetchMyFollowing(resUser.data.username);
        setFollowing(resFollowing.data);
      } catch (e) {
        setError(e as Error);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { user, following, loading, error };
};