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
	return (
		<S.LiveCardContainer onClick={() => {}}>
			<S.EmptyText>방송 준비중입니다.</S.EmptyText>
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
