import { VideoItem } from "@/entities/video/model/type";
import { VideoList} from "@/shared/ui/video/video-list";


const recodedVideos: VideoItem[] = [
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
]

recodedVideos.push(...recodedVideos);
recodedVideos.push(...recodedVideos);
recodedVideos.push(...recodedVideos);

export const ProfileVideoWidget = () => {
	return (
		<VideoList videos={recodedVideos} maxColumns={4}/>
	)
}