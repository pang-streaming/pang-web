import styled, {css} from "styled-components";
import { VideoCard } from "@/entities/video/ui/video-card";
import { LastVideoListProps } from "./type";



export const LastVideoList = ({videos, maxColumns}: LastVideoListProps) => {
	const safeVideos = Array.isArray(videos) ? videos : [];
	
	return (
		<VideoListContainer maxColumns={maxColumns}>
			{safeVideos.map((video, index) => (
				<VideoCard
					key={video.streamId || index}
					streamId={video.streamId}
					userId={video.nickname}
					title={video.title}
					url={video.url}
					followers={video.viewCount}
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
  margin-bottom: 60px;
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