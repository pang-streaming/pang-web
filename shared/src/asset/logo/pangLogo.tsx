import Logo from "../../asset/logo/pang.svg?react";
import styled from "styled-components";


export const PangLogo = styled(Logo)<{type: 'streamer' | 'user'}>`
    color: ${({theme, type}) => type === 'user' ? theme.colors.primary.normal : theme.colors.text.normal}
`