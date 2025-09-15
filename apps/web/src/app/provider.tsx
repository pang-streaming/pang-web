import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/query-client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { CustomThemeProvider, GlobalStyle } from "@pang/shared/ui";
import { ReactNode } from "react";
import { InitModal } from "@/widgets/init-modal/_index";
import { useProvider } from "./hooks/useProvider";

export const Provider = ({ children }: { children: ReactNode }) => {
  const { user, isModalOpen, closeModal } = useProvider();

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
              onClose={closeModal}
              username={user?.username}
            />
          )}
        </BrowserRouter>
      </CustomThemeProvider>
    </QueryClientProvider>
  );
};
