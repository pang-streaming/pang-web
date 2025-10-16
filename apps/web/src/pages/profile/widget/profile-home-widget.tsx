import {HeaderVideo} from "@/entities/video/ui/header-video";
import { VideoItem } from "@/entities/video/model/type";

const videos: VideoItem[] = [
	{
		streamId: "1",
		title: "안녕하세요",
		url: "",
		username: "test",
		nickname: "test",
	}
]

export const ProfileHomeWidget = () => {
	return (
		<HeaderVideo videos={videos} hideProfile />
	)
}