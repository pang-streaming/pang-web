import styled from "styled-components";
import SmallHeart from "@/app/assets/smallHeart.svg?react";
import { Post } from "../model/post";

// interface CommunityItemProps {
// 	isNotification: boolean;
// }

export const CommunityItem = ({ post, onClick }: { post: Post; onClick?: () => void }) => {
	const hasImages = post.images && post.images.length > 0;
	
	return (
		<CommunityItemContainer isNotification={false} onClick={onClick}>
			<LeftInfoWrapper>
				<Index isNotification={false}>공지</Index>
				<ContentWrapper>
					<Title>{post.title}</Title>
					{hasImages && (
						<ImagePreviewSmall>
							<ImageThumbnail src={post.images![0]} alt="썸네일" />
							{post.images!.length > 1 && (
								<ImageBadge>+{post.images!.length - 1}</ImageBadge>
							)}
						</ImagePreviewSmall>
					)}
				</ContentWrapper>
			</LeftInfoWrapper>
			<RightInfoWrapper>
				<Author>{post.nickname}</Author>
				<WriteTime>{post.createdAt}</WriteTime>
				<LikeWrapper>
					<SmallHeart/>
					<Like>{post.likes}</Like>
				</LikeWrapper>
			</RightInfoWrapper>
		</CommunityItemContainer>
	)
}

const CommunityItemContainer = styled.div<{isNotification: boolean}>`
	width: 100%;
	display: flex;
  flex-direction: row;
	align-items: center;
	text-align: center;
	justify-content: space-between;
	padding: 15px;
	background-color: ${({theme, isNotification}) =>
	isNotification
		? `${theme.colors.secondary.normal}35`
		: "transparent"
	};
	border-radius: ${({theme}) => theme.borders.xlarge};
	cursor: pointer;
	&:hover {
			background-color: ${({theme}) => theme.colors.hover.light};
	}
`

const LeftInfoWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 50px;
`

const Index = styled.span<{isNotification: boolean}>`
	width: 35px;
	font-size: ${({theme}) => theme.font.large};
	font-weight: 700;
	padding: 4px 10px;
	background-color: ${({theme, isNotification}) => isNotification ? theme.colors.secondary.normal : theme.colors.common.grey};
	text-align: center;
	border-radius: ${({theme}) => theme.borders.medium};
	color: ${({theme}) => theme.colors.common.white};
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 8px;
`;

const Title = styled.span`
	color: ${({theme}) => theme.colors.text.normal};
	font-size: ${({theme}) => theme.font.large};
	font-weight: 700;
`;

const ImagePreviewSmall = styled.div`
	position: relative;
	display: inline-block;
`;

const ImageThumbnail = styled.img`
	width: 60px;
	height: 60px;
	object-fit: cover;
	border-radius: ${({theme}) => theme.borders.medium};
	border: 1px solid ${({theme}) => theme.colors.border.normal};
`;

const ImageBadge = styled.span`
	position: absolute;
	bottom: 4px;
	right: 4px;
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
	font-size: ${({theme}) => theme.font.small};
	padding: 2px 6px;
	border-radius: ${({theme}) => theme.borders.small};
	font-weight: 600;
`;

const RightInfoWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 77px;
	margin-right: 50px;
`

const Author = styled.span`
	color: ${({theme}) => theme.colors.text.normal};
	font-size: ${({theme}) => theme.font.large};
	font-weight: 700;
`

const WriteTime = styled.span`
  color: ${({theme}) => theme.colors.text.normal};
  font-size: ${({theme}) => theme.font.large};
  font-weight: 700;
`

const LikeWrapper = styled.div`
	color: ${({theme}) => theme.colors.text.normal};
  display: flex;
	flex-direction: row;
	align-items: center;
	gap: 2px;
`

const Like = styled.span`
    font-size: ${({theme}) => theme.font.medium};
    font-weight: 700;
`