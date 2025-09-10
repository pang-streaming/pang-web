import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/shared/lib/query-client"
import { ThemeProvider } from "styled-components"
import { ToastContainer } from "react-toastify";
import { darkTheme } from "../../../../shared/src/ui/theme/index";
import { BrowserRouter } from "react-router-dom";
import { CustomThemeProvider, GlobalStyle } from "@pang/shared/ui";





export const Provider = ({children}: {children: React.ReactNode}) => {
    return <QueryClientProvider client={queryClient}>
    <GlobalStyle />
      <CustomThemeProvider>
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
      </CustomThemeProvider>
  </QueryClientProvider>
}