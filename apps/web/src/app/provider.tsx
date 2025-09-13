import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/shared/lib/query-client"
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { CustomThemeProvider, GlobalStyle } from "@pang/shared/ui";
import {ReactNode} from "react";

export const Provider = ({children}: {children: ReactNode}) => {
    return <QueryClientProvider client={queryClient}>
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
				<BrowserRouter>{children}</BrowserRouter>
		</CustomThemeProvider>
  </QueryClientProvider>
}