import { useNavigate } from "react-router-dom";
import { Video } from "../../../types/video.ts";
import * as S from './livecard.style.ts';

export const LiveCard = ({ streamImage, profileImage, title, nickname }: Video) => {

    const navigate = useNavigate();

    const goToStream = () => {
        navigate(`/livedetail`);

    }

    return (
        <S.LiveCardContainer onClick={goToStream}>
            <S.Thumbnail src={streamImage}/>
                <S.Spacer />
            <S.LiveInfo>
                <S.ProfileImage src={profileImage}/>
                <S.TitleContainer>
                    <S.LiveTitle>{title}</S.LiveTitle>
                    <S.StreamerName>{nickname}</S.StreamerName>
                </S.TitleContainer>
            </S.LiveInfo>
        </S.LiveCardContainer>
    )
}
