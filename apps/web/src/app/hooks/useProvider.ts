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

        const hasCompletedInitialSetup = localStorage.getItem(
          "hasCompletedInitialSetup"
        );

        if (!hasCompletedInitialSetup || !res.data.age || !res.data.gender) {
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
    localStorage.setItem("hasCompletedInitialSetup", "true");
  };

  return {
    user,
    isModalOpen,
    closeModal,
  };
};
