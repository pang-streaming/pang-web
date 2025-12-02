import styled, {css} from "styled-components";
import { VideoListProps } from "@/entities/video/model/type";
import { VideoCard } from "@/entities/video/ui/video-card";



export const VideoList = ({videos, maxColumns}: VideoListProps) => {
	const safeVideos = Array.isArray(videos) ? videos : [];

	return (
		<VideoListContainer maxColumns={maxColumns}>
			{safeVideos.map((video, index) => (
				<VideoCard
					key={video.streamId || index}
					streamId={video.streamId}
					userId={video.userId}
					title={video.title}
					url={video.url}
					followers={video.followers}
					username={video.username}
					nickname={video.nickname}
					profileImage={video.profileImage}
					thumbnail={video.thumbnail}
					viewCount={video.viewCount}
					isLive={video.isLive}
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