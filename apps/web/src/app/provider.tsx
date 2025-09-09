import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/lib/query-client";
import { ThemeProvider } from "styled-components";
// import { BrowserRouter } from "react-router-dom";
// import { SocketProvider } from "../provider/socket-provider";
// import { SignupProvider } from "../pages/signup/signup-context";
// import { ToastContainer } from "react-toastify";
import { theme } from "@pang/shared/ui";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import { ToastContainer } from "react-toastify";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
        <ThemeProvider theme={theme}>
          {/* <BrowserRouter>
          <SocketProvider>
            <SignupProvider>
            */}
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
          </SocketProvider>
        </BrowserRouter> */}
        </ThemeProvider>
    </QueryClientProvider>
  );
};
