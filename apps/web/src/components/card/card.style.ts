import styled from "styled-components";

export const CardContainer = styled.div`
    width: 100%;
    height: 285px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
`

export const CardVideo = styled.div`
    width: 100%;
    height: 225px;
    background-color: #27272A;
    border-radius: 12px;
`;

export const CardInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

export const ProfileIcon = styled.div`
    width: 50px;
    height: 50px;
    background-color: #737373;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Title = styled.span`
    font-size: 20px;
    color: white;
`;

export const StreamerName = styled.span`
    color: #555;
`;