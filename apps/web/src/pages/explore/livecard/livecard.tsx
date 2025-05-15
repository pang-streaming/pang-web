import { useNavigate } from "react-router-dom";
import {LiveCardProps} from "./livecard.props.ts";
import {Thumbnail, LiveCardContainer, LiveInfo, LiveTitle, ProfileImage, StreamerName, TitleContainer, Spacer} from "./livecard.style.ts";

export const LiveCard = ({ profileImage, title, streamerName }: LiveCardProps) => {
    return (
        <LiveCardContainer>
            <Thumbnail src={profileImage}/>
                <Spacer />
            <LiveInfo>
                <ProfileImage src={profileImage}/>
                <TitleContainer>
                    <LiveTitle>{title}</LiveTitle>
                    <StreamerName>{streamerName}</StreamerName>
                </TitleContainer>
            </LiveInfo>
        </LiveCardContainer>
    )
}