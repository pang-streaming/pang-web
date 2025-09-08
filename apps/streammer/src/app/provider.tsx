import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../shared/lib/query-client"
import { ThemeProvider } from "styled-components"
import {lightTheme} from "@pang/shared/theme";



export const Provider = ({children}: {children: React.ReactNode}) => {
    return <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
            {children}
        </ThemeProvider>
    </QueryClientProvider>
}