import { useNavigate } from "react-router-dom";
import {LiveCardProps} from "./livecard.props.ts";
import {Thumbnail, LiveCardContainer, LiveInfo, LiveTitle, ProfileImage, StreamerName, TitleContainer, Spacer} from "./livecard.style.ts";

export const LiveCard = ({ streamImage, profileImage, title, nickname }: LiveCardProps) => {

    const navigate = useNavigate();

    const goToStream = () => {
        navigate(`/livedetail`);
        // ?url=${encodeURIComponent(streamUrl)}
    }

    return (
        <LiveCardContainer onClick={goToStream}>
            <Thumbnail src={streamImage}/>
                <Spacer />
            <LiveInfo>
                <ProfileImage src={profileImage}/>
                <TitleContainer>
                    <LiveTitle>{title}</LiveTitle>
                    <StreamerName>{nickname}</StreamerName>
                </TitleContainer>
            </LiveInfo>
        </LiveCardContainer>
    )
}