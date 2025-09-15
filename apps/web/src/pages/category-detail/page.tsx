import styled from "styled-components";
import {TabTitleText} from "@/shared/ui/tab-title-text";
import {Segment, SegmentButtonGroup} from "@pang/shared/ui";
import React from "react";
import {VideoItem, VideoList} from "@/shared/ui/video/video-list";
import {ChipList} from "@/shared/ui/chip/chip-list";
import {Chip} from "@/entities/chip/model/type";


const liveVideos: VideoItem[] = [
	{
		streamId: "11",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "12",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "13",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "14",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "15",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "16",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "17",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "18",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "19",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "20",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "21",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
	{
		streamId: "22",
		title: "하하ㅑ",
		url: "",
		username: "강연",
		nickname: "강연"
	},
]

liveVideos.push(...liveVideos)
liveVideos.push(...liveVideos)
liveVideos.push(...liveVideos)
liveVideos.push(...liveVideos)

const segments: Segment[] = [
	{
		id: 'live',
		name: '라이브'
	},
	{
		id: 'video',
		name: '동영상'
	}
]

const chips: Chip[] = [
	{
		id: '1',
		name: 'asd',
		type: 'normal'
	},
	{
		id: '2',
		name: 'asdsd',
		type: 'normal'
	},
]

export const CategoryDetail = () => {
	return (
		<CategoryDetailContainer>
			<TabTitleText>카테고리</TabTitleText>
			<CategoryBoxWrapper>
				<CategoryThumbnail src="https://picsum.photos/205/280"/>
				<CategoryInfoWrapper>
					<Title>포르자 호라이즌 5</Title>
					<CategoryInfo>시청자 24명 · 라이브 1개</CategoryInfo>
					<ChipList chips={chips}/>
				</CategoryInfoWrapper>
			</CategoryBoxWrapper>
			<SegmentHeader>
				<SegmentButtonGroup segments={segments}/>
			</SegmentHeader>
			<VideoList videos={liveVideos}/>
		</CategoryDetailContainer>
	)
}

const CategoryDetailContainer = styled.div`
	width: 100%;
	gap: 12px;
`

const SegmentHeader = styled.div`
  box-sizing: border-box;
	position: sticky;
  top: 67px;
  background-color: ${({theme}) => theme.colors.background.normal};
  z-index: 1;
  display: flex;
	flex-direction: row;
  align-items: center;
`;

const CategoryThumbnail = styled.img`
	border-radius: ${({ theme }) => theme.borders.medium};
	width: 150px;
	aspect-ratio: 41 / 56;
	background-color: ${({theme}) => theme.colors.content.normal};
`

const CategoryBoxWrapper = styled.div`
	width: 100%;
	display: flex;
  margin-top: 30px;
	flex-direction: row;
	justify-content: start;
`

const CategoryInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 10px;
	padding: 20px 10px;
	gap: 10px;
`

const Title = styled.span`
	font-size: ${({theme}) => theme.font.xxxLarge};
	color: ${({ theme }) => theme.colors.text.normal};
	font-weight: bold;
`

const CategoryInfo = styled.span`
	color: ${({theme}) => theme.colors.text.subtitle};
	font-weight: bold;
	font-size: ${({theme}) => theme.font.medium};
`