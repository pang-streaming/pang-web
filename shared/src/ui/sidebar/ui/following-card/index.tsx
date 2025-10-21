
export interface FollowingCardProps {
  profileImage?: string;
  nickname: string;
  username: string;
  isSidebarOpen?: boolean;
}
import * as S from "./style";
import normalProfile from "../../../../asset/logo/normal_profile.svg?url";
import { useNavigate } from "react-router-dom";



export const FollowingCard = ({
  profileImage,
  nickname,
  username,
  isSidebarOpen = false
}: FollowingCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <S.Container isSidebarOpen={isSidebarOpen} onClick={handleClick}>
      <S.ProfileImage src={profileImage || normalProfile} alt={nickname} />
      {isSidebarOpen && <S.Nickname>{nickname}</S.Nickname>}
    </S.Container>
  );
};