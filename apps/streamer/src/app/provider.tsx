import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../shared/lib/query-client"
import {CustomThemeProvider, GlobalStyle} from "@pang/shared/ui";

export const Provider = ({children}: {children: React.ReactNode}) => {
    return <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
            <GlobalStyle/>
            {children}
        </CustomThemeProvider>
    </QueryClientProvider>
}