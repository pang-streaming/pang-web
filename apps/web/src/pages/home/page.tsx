import * as S from "./style";
import {VideoCard} from "@/entities/video/ui/video-card";
import {HeaderVideo} from "@/entities/video/ui/header-video";

export const Home = () => {
	const videos = [
		{
			streamId: "11",
			title: "안녕하세요",
			url: "",
			username: "강연",
			nickname: "강연",
			profileImage: "https://picsum.photos/200",
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
		}
	]

	return (
    <S.Container>
	    <HeaderVideo videos={videos}/>
        <S.Title>이 방송 어때요?</S.Title>
        <S.GridContainer>
            <VideoCard
                streamId="11"
                title="title"
                url=""
                username="강연"
                nickname="강연"
                profileImage=""
            />
        </S.GridContainer>
    </S.Container>
  );
};
