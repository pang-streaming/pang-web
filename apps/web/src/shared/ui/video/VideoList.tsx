import styled from "styled-components";
import {VideoCard} from "@/entities/video/ui/video-card";

export interface VideoItem {
	streamId: string;
	title: string;
	url: string;
	username: string;
	nickname: string;
	profileImage?: string;
}

interface VideoListProps {
	videos: VideoItem[];
}

export const VideoList = ({videos}: VideoListProps) => {
	return (
		<VideoListContainer>
			{videos.map((video) => (
				<VideoCard
					streamId={video.streamId}
					title={video.title}
					url={video.url}
					username={video.username}
					nickname={video.nickname}
					profileImage={video.profileImage}
				/>
			))}
		</VideoListContainer>
	);
}

const VideoListContainer = styled.div`
	display: grid;
    gap: 20px;
    width: 100%;

    grid-template-columns: repeat(1, 1fr);

    @media (min-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1600px) {
        grid-template-columns: repeat(4, 1fr);
    }
	
	@media (min-width: 1900px) {
		grid-template-columns: repeat(5, 1fr);
	}
	
    @media (min-width: 2090px) {
        grid-template-columns: repeat(6, 1fr);
    }
`;
