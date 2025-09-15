import { TabTitleText } from "@/shared/ui/tab-title-text";
import styled from "styled-components";
import {Segment, SegmentButtonGroup} from "@pang/shared/ui";
import {VideoItem, VideoList} from "@/shared/ui/video/VideoList";

const segments: Segment[] = [
	{
		id: "live",
		name: "라이브"
	},
	{
		id: "video",
		name: "동영상"
	}
];


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

liveVideos.push(...liveVideos);
liveVideos.push(...liveVideos);
liveVideos.push(...liveVideos);

export const Explore = () => {
  return (
    <ExploreContainer>
      <TabTitleText>탐색</TabTitleText>
	    <SegmentHeader>
		    <SegmentButtonGroup segments={segments} />
	    </SegmentHeader>
	    <VideoList videos={liveVideos}/>
    </ExploreContainer>
  );
};

export const ExploreContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;


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