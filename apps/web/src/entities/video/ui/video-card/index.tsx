
import * as S from "./style";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import {useVideoCard} from "@/entities/video/hooks/controller/useVideoCard";
import { VideoItem } from "../../model/type";

export const VideoCard = ({
  streamId,
  title,
  url,
  username,
  nickname,
  profileImage,
}: VideoItem) => {
	const {handleOnClickVideoCard, handleOnClickProfile} = useVideoCard({streamId, username});

	return (
		<S.LiveCardContainer  onClick={handleOnClickVideoCard}>
			<S.VideoContainer>
				<S.Thumbnail src={url} alt={title} />
			</S.VideoContainer>
			<S.LiveInfo>
				<S.ProfileImage src={profileImage || normalProfile} onClick={handleOnClickProfile} />
				<S.TitleContainer>
					<S.LiveTitle>{title}</S.LiveTitle>
					<S.StreamerName>{nickname}</S.StreamerName>
				</S.TitleContainer>
			</S.LiveInfo>
		</S.LiveCardContainer>
	);
};
