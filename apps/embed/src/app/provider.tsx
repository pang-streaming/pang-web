import {CustomThemeProvider,  GlobalStyleWithoutBackground} from "@pang/shared/ui";

export const Provider = ({children}: {children: React.ReactNode}) => {
    return  <CustomThemeProvider>
            <GlobalStyleWithoutBackground/>
            {children}
        </CustomThemeProvider>
}