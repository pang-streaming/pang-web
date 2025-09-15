import { useEffect, useState } from "react";
import { fetchMyInfo } from "@/entities/user/api/api";
import { User } from "@/entities/user/model/type";

export const useProvider = () => {
  const [user, setUser] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchMyInfo();
        setUser(res.data);

        if (res.data.gender === null) {
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      }
    };

    fetchUser();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    user,
    isModalOpen,
    closeModal,
  };
};
