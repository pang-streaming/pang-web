import { BaseHeader, HeaderLogoContainer } from "./header.style";
import logo from "../../assets/logo.svg";

export const Header = () => {
    return (
        <BaseHeader>
            <HeaderLogoContainer>
                <img src={logo} alt="logo" />
            </HeaderLogoContainer>
        </BaseHeader>
    );
};
