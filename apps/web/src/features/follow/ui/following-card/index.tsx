
export interface FollowingCardProps {
    profileImage?: string;
    streamerName: string;
    followerCount: string;
}
import * as S from "./style";
import normalProfile from "@/app/assets/images/normal_profile.svg";

export const FollowingCard = ({
  profileImage,
  streamerName,
  followerCount,
}: FollowingCardProps) => {
  return (
    <S.FollowingCardContainer>
      <S.ProfileImageContainer>
      <S.ProfileImage src={profileImage || normalProfile} alt="" />
      </S.ProfileImageContainer>
      <S.StreamerName>{streamerName}</S.StreamerName>
      <S.FollowerCount>{followerCount}명</S.FollowerCount>
    </S.FollowingCardContainer>
  );
};
