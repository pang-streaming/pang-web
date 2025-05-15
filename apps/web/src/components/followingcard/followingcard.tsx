import { FollowingCardProps } from "./followingcard.props"
import { FollowerCount, FollowingCardContainer, ProfileImage, StreamerName } from "./followingcard.style"


export const FollowingCard = ({ profileImage, streamerName, followerCount }:FollowingCardProps) => {
    return (
        <FollowingCardContainer>
            <ProfileImage src={profileImage} alt="디룩"/>
            <StreamerName>{streamerName}</StreamerName>
            <FollowerCount>{followerCount}만명</FollowerCount>
        </FollowingCardContainer>
    )
}