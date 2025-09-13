import styled from "styled-components";
import SmallHeart from "@/app/assets/smallHeart.svg?react";

export const ProfileCommunityWidget = () => {
	return (
		<CommunityContainer>
			<CommunityTagWrapper>
				<CommunityTagList>
					<CommunityTag selected>전체</CommunityTag>
					<CommunityTag>자유게시판</CommunityTag>
					<CommunityTag>공지글</CommunityTag>
				</CommunityTagList>
				<WriteButton>글쓰기 +</WriteButton>
			</CommunityTagWrapper>
			<CommunityItemList>
				<CommunityItem isNotification={true}>
					<LeftInfoWrapper>
						<Index isNotification={true}>공지</Index>
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
				</CommunityItem>
			</CommunityItemList>
		</CommunityContainer>
	)
}

const CommunityContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const CommunityTagWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const CommunityTagList = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
`

const CommunityTag = styled.span<{selected?: boolean}>`
	border-radius: ${({theme}) => theme.borders.maximum};
	padding: 4px 10px;
	color: ${({theme, selected}) => selected ? theme.colors.background.dark : theme.colors.text.subtitle};
	border: 2px solid ${({theme, selected}) => selected ? theme.colors.text.normal : theme.colors.text.subtitle};
	background-color: ${({theme, selected}) => selected ? theme.colors.text.normal : 'none'};
	cursor: pointer;
	font-size: ${({theme}) => theme.font.medium};
	font-weight: 700;
	user-select: none;
	&:hover {
			background-color: ${({theme, selected}) => selected ? theme.colors.text.normal : theme.colors.hover.light};
	}
`

const WriteButton = styled.button`
	outline: none;
	border: none;
	padding: 8px 10px;
	background-color: ${({theme}) => theme.colors.primary.normal};
	border-radius: ${({theme}) => theme.borders.large};
	color: ${({theme}) => theme.colors.common.white};
	cursor: pointer;
	font-size: ${({theme}) => theme.font.medium};
	font-weight: 500;
	&:hover {
			background-color: ${({theme}) => theme.colors.hover.normal};
	}
`

const CommunityItemList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 2px;
`;

const CommunityItem = styled.div<{isNotification: boolean}>`
	width: 100%;
	display: flex;
  flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	background-color: ${({theme, isNotification}) =>
	  isNotification
	  ? `${theme.colors.secondary.normal}35`
	  : "transparent"
	};
	border-radius: ${({theme}) => theme.borders.xlarge};
	cursor: pointer;
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
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 2px;
`

const Like = styled.span`
    color: ${({theme}) => theme.colors.text.normal};
    font-size: ${({theme}) => theme.font.medium};
    font-weight: 700;
`