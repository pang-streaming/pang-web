
import * as S from "./style";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import {useVideoCard} from "@/entities/video/hooks/controller/useVideoCard";
import { IStreamDataResponse } from "../../model/type";
import nullThumbnail from '@/app/assets/video-thumbnail.png'


export const VideoCard = ({
  streamId,
  title,
  url,
  username,
  nickname,
  profileImage,
  thumbnail
  
}: IStreamDataResponse) => {
	const {handleOnClickVideoCard, handleOnClickProfile} = useVideoCard({streamId, username});
	
	const displayThumbnail = thumbnail || nullThumbnail;

	return (
		<S.LiveCardContainer  onClick={handleOnClickVideoCard}>
			<S.VideoContainer>
				<S.Thumbnail src={displayThumbnail} alt={title} />
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
