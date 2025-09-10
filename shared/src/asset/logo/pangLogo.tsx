import Logo from "../../asset/logo/pang.svg?react";
import StreamerLogo from "../../asset/logo/streamer.svg?react";
import styled from "styled-components";
import React from "react";

const BaseLogo = styled.div<{type: 'streamer' | 'user'}>`
    color: ${({theme, type}) => type === 'user' ? theme.colors.primary.normal : theme.colors.text.normal};
    display: inline-block;
`;

// web 로고 스타일링
const StyledPangLogo = styled(BaseLogo)`
    svg {
        display: block;
    }
`;

// streamer 로고 스타일링
const StyledStreamerLogo = styled(BaseLogo)`
    margin-left: 10px;
    margin-top: 4px;
    svg {
        height: 19px;
        display: block;
    }
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

interface PangLogoProps {
    type: 'streamer' | 'user';
    onClick?: () => void;
    cursor?: string;
}

export const PangLogo: React.FC<PangLogoProps> = ({ type, onClick, cursor }) => {
    return (
        <LogoContainer onClick={onClick} style={{ cursor }}>
            <StyledPangLogo type={type}>
                <Logo />
            </StyledPangLogo>
            {type === 'streamer' && (
                <StyledStreamerLogo type={type}>
                    <StreamerLogo />
                </StyledStreamerLogo>
            )}
        </LogoContainer>
    );
}