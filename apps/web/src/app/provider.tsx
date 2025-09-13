import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/query-client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { CustomThemeProvider, GlobalStyle } from "@pang/shared/ui";
import { ReactNode, useEffect, useState } from "react";
import { InitModal } from "@/widgets/init-modal/_index";
import { fetchMyInfo } from "@/entities/user/api/api";
import { User } from "@/entities/user/model/type";

export const Provider = ({ children }: { children: ReactNode }) => {
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

  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        <BrowserRouter>
          {children}
          {user && (
            <InitModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                localStorage.setItem("hasCompletedInitialSetup", "true");
              }}
              username={user?.username}
            />
          )}
        </BrowserRouter>
      </CustomThemeProvider>
    </QueryClientProvider>
  );
};
