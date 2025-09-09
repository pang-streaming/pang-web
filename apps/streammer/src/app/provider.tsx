import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../shared/lib/query-client"
import {CustomThemeProvider} from "@pang/shared/ui";

export const Provider = ({children}: {children: React.ReactNode}) => {
    return <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
            {children}
        </CustomThemeProvider>
    </QueryClientProvider>
}