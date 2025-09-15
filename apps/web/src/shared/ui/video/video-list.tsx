import styled, {css} from "styled-components";
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
	maxColumns?: number;
}

export const VideoList = ({videos, maxColumns}: VideoListProps) => {
	return (
		<VideoListContainer maxColumns={maxColumns}>
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

const breakpoints = [800, 1200, 1600, 1900, 2090];

const VideoListContainer = styled.div<{maxColumns?: number}>`
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);

  ${({ maxColumns = 6 }) => css`
    ${breakpoints.slice(0, maxColumns - 1).map(
	(bp, i) => css`
        @media (min-width: ${bp}px) {
          grid-template-columns: repeat(${Math.min(i + 2, maxColumns)}, 1fr);
        }
      `
)}
  `}
`;