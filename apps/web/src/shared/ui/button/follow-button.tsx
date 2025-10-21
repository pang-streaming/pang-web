import styled from "styled-components";
import {IoHeart} from "react-icons/io5";
import {IoMdHeartEmpty} from "react-icons/io";

interface FollowButtonProps {
	isFollowing: boolean;
	onClick: () => void;
	disabled: boolean;
}

export const FollowButton = ({isFollowing, onClick, disabled}: FollowButtonProps) => {
	return (
		<FollowButtonWrapper
			onClick={onClick}
			disabled={disabled}
			isFollowing={isFollowing}
		>
			{isFollowing ? <IoHeart size={20} /> : <IoMdHeartEmpty size={20} />}
			<FollowButtonText>
				{isFollowing ? "언팔로우" : "팔로우"}
			</FollowButtonText>
		</FollowButtonWrapper>
	)
}

const FollowButtonWrapper = styled.button<{isFollowing?: boolean}>`
	padding: 0 12px;
	height: 31px;
	border-radius: ${({theme}) => theme.borders.medium};
	outline: none;
	border: none;
	background-color: ${({isFollowing, theme}) => 
		isFollowing ? theme.colors.primary.normal : theme.colors.secondary.normal};
	display: flex;
	align-items: center;
	gap: 6px;
	white-space: nowrap;
	flex-shrink: 0;
	color: ${({theme}) => theme.colors.common.white};
	transition: all 0.2s ease;
  
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FollowButtonText = styled.span`
	font-size: 14px;
	font-weight: 700;
	color: ${({theme}) => theme.colors.common.white};
	flex-shrink: 0;
`;