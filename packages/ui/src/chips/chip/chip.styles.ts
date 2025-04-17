import styled from 'styled-components';
import { ChipProps } from './chip.props';

export const ChipContainer = styled.div<ChipProps>`
    width: 69px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.textColor};
    background-color: ${(props) => props.bgColor};
    border-radius: 999px;
`