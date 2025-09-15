import styled from "styled-components";
import {CommunityItem} from "@/features/community/ui/community-item";
import {Tag, TagButton} from "@pang/shared/ui";

const tags: Tag[] = [
	{
		id: 'all',
		name: '전체'
	},
	{
		id: 'community',
		name: '자유게시판'
	},
	{
		id: 'notification',
		name: '공지글'
	},
]

export const ProfileCommunityWidget = () => {
	return (
		<CommunityContainer>
			<CommunityTagWrapper>
				<TagButton tags={tags} defaultTagId={'all'}/>
				<WriteButton>글쓰기 +</WriteButton>
			</CommunityTagWrapper>
			<CommunityItemList>
				<CommunityItem isNotification={true} />
				<CommunityItem isNotification={false} />
				<CommunityItem isNotification={false} />
				<CommunityItem isNotification={false} />
				<CommunityItem isNotification={false} />
				<CommunityItem isNotification={false} />
				<CommunityItem isNotification={false} />
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
	font-weight: bold;
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