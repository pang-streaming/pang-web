import { useNavigate } from "react-router-dom";
import type { Video } from "../../model/type";
import * as S from "./style";
import normalProfile from "@/app/assets/images/normal_profile.svg";

export const VideoCard = ({
  streamId,
  title,
  url,
  username,
  nickname,
  profileImage,
}: Video) => {
	const navigate = useNavigate();
	const handleOnClickVideoCard = () => {
		console.log(streamId);
		navigate(`/livedetail?streamId=${streamId}`);
	};

	return (
		<S.LiveCardContainer  onClick={handleOnClickVideoCard}>
			<S.VideoContainer>
				{/*<S.Thumbnail/>*/}
			</S.VideoContainer>
			<S.LiveInfo>
				<S.ProfileImage src={profileImage || normalProfile} />
				<S.TitleContainer>
					<S.LiveTitle>{title}</S.LiveTitle>
					<S.StreamerName>{nickname}</S.StreamerName>
				</S.TitleContainer>
			</S.LiveInfo>
		</S.LiveCardContainer>
	);
};
