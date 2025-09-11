import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/query-client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { CustomThemeProvider, GlobalStyle } from "@pang/shared/ui";
import { SocketProvider } from "@/pages/live-detail/widget/chatting-section/model/socket-provider";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        {/* <BrowserRouter>
        <SignupProvider>
        */}
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
          <BrowserRouter>{children}</BrowserRouter>
        {/* </SignupProvider>
      </BrowserRouter> */}
      </CustomThemeProvider>
    </QueryClientProvider>
  );
};
