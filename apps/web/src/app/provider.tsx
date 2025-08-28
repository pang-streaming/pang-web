import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../shared/lib/query-client"
import { ThemeProvider } from "styled-components"
import { theme } from "@pang/shared/ui"

export const Provider = (children:React.ReactNode) => {
    return <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </QueryClientProvider>
}