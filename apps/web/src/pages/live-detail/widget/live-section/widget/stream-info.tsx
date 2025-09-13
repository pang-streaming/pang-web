import Heart from "@/app/assets/heart.svg";
import HeartFill from "@/app/assets/heart-fill.svg";
import nomalProfile from "@/app/assets/images/normal_profile.svg";
import { useFollowInfo } from "../model/useFollowInfo";
import * as S from '../style';

interface StreamInfoProps {
  title?: string;
  nickname?: string;
}

export const StreamInfo = ({ title, nickname }: StreamInfoProps) => {
  const { followerCount, isFollowing, isLoading, toggleFollow } = useFollowInfo(nickname);

  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: 18,
          justifyContent: "space-between",
        }}
      >
        <S.StreamTitle>{title ?? "제목 없는 방송"}</S.StreamTitle>

        <S.FollowButton
          onClick={toggleFollow}
          disabled={isLoading}
        >
          <img
            src={!isFollowing ? Heart : HeartFill}
            style={{ width: 15, height: 13.75 }}
          />
          <S.FollowButtonText>
            {isFollowing ? "언팔로우" : "팔로우"}
          </S.FollowButtonText>
        </S.FollowButton>
      </div>
      
      <S.StreamerInfo>
        <img
          src={nomalProfile}
          alt=""
          style={{ width: 60, height: 60, borderRadius: "50%" }}
        />
        <div>{nickname || "unknown_user"}</div>
        <div>
          <div style={{ fontSize: 12, color: "#999" }}>
            팔로워 {followerCount.toLocaleString()}명
          </div>
        </div>
      </S.StreamerInfo>
    </>
  );
};
