import { Video } from "../../../types/main.ts";
import * as S from "./livecard.style.ts";

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
