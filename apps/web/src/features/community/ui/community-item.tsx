import styled from "styled-components";
import SmallHeart from "@/app/assets/smallHeart.svg?react";

interface CommunityItemProps {
	isNotification: boolean;
}

export const CommunityItem = ({isNotification}: CommunityItemProps) => {
	return (
		<CommunityItemContainer isNotification={isNotification}>
			<LeftInfoWrapper>
				<Index isNotification={isNotification}>공지</Index>
				<Title>개인사정으로 인한 휴방 안내</Title>
			</LeftInfoWrapper>
			<RightInfoWrapper>
				<Author>강연</Author>
				<WriteTime>25.9.2.</WriteTime>
				<LikeWrapper>
					<SmallHeart/>
					<Like>294</Like>
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
			background-color: ${({theme}) => theme.colors.hover.light};\
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

const Title = styled.span`
	color: ${({theme}) => theme.colors.text.normal};
	font-size: ${({theme}) => theme.font.large};
	font-weight: 700;
`

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