import { PiEyedropperThin } from "react-icons/pi";
import styled from "styled-components";



export const BadgeRankingContainer = styled.div`
    display: flex;
    align-items: center;

`
export const FistBadgeRankingColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`
export const FisrtBadgeViewerName = styled.span` 
    font-size: 16px;
    font-weight: 700;
`
export const FisrtBadgePungCount = styled.span` 
    font-size: 10px;
    font-weight: 700;
`

export const RemainBadgeViewerName = styled.span` 
    width: 47px;
    font-size: 10px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const RemainBadgePungCount = styled.span` 
    font-size: 8px;
    font-weight: 700;
`



//채팅에 뜨는 뱃지 모여있는 컨테이너 스타일

export const BadgeContainer = styled.div`
    margin-bottom: 20px;
    width: 95%;
    height: 64px;
    border-radius: 8px;
    background-color: black;
    display: flex;
    align-items: center;
    gap: 18px;
`
export const RemainBadgeColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`
