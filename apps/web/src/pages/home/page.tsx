import * as S from "./style";
import { HeaderVideo } from "@/entities/video/ui/header-video";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import {VideoItem, VideoList} from "@/shared/ui/video/video-list";

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

export const Home = () => {
  const videos = [
    {
      streamId: "10",
      title: "안녕하세요",
      url: "",
      username: "강연",
      nickname: "강연"
    },
    {
      streamId: "12",
      title: "안녕하세요2",
      url: "",
      username: "1",
      nickname: "1",
      profileImage: "https://picsum.photos/200",
    },
    {
      streamId: "12",
      title: "안녕하세요3",
      url: "",
      username: "2",
      nickname: "2",
      profileImage: "https://picsum.photos/200",
    },
  ];

  return (
    <S.Container>
      <HeaderVideo videos={videos} />
      <TabTitleText>이 방송 어때요?</TabTitleText>
      <VideoList videos={liveVideos}/>
    </S.Container>
  );
};
