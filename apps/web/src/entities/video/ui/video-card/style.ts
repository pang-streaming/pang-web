import styled from "styled-components";

export const LiveCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
	gap: 12px;
	&:hover {
		cursor: pointer;
	}
`;

export const VideoContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	aspect-ratio: 16 / 9;
	border-radius: ${({theme}) => theme.borders.xlarge};
	background-color: ${({theme}) => theme.colors.content.dark};
	overflow: hidden;
`

export const Thumbnail = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`

export const PreviewVideoContainer = styled.div<{ $isVisible?: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	transition: opacity 0.3s ease-in-out;
	pointer-events: none;

	.video-js {
		width: 100%;
		height: 100%;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

export const SeekbarContainer = styled.div`
	position: absolute;
	bottom: 8px;
	left: 8px;
	right: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 10px;
	background: rgba(0, 0, 0, 0.7);
	border-radius: 8px;
	backdrop-filter: blur(4px);
`

export const SeekbarTime = styled.span`
	font-size: 11px;
	color: white;
	font-weight: 500;
	min-width: 36px;
	text-align: center;
`

export const SeekbarWrapper = styled.div`
	position: relative;
	flex: 1;
	height: 4px;
	background: rgba(255, 255, 255, 0.3);
	border-radius: 2px;
`

export const SeekbarProgress = styled.div<{ $progress: number }>`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: ${({ $progress }) => $progress}%;
	background: ${({ theme }) => theme.colors.primary.normal};
	border-radius: 2px;
	pointer-events: none;
`

export const SeekbarInput = styled.input`
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	width: 100%;
	height: 12px;
	margin: 0;
	opacity: 0;
	cursor: pointer;

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 12px;
		height: 12px;
		background: white;
		border-radius: 50%;
		cursor: pointer;
	}
`

export const LiveBadge = styled.div`
	position: absolute;
	top: 8px;
	left: 8px;
	padding: 4px 8px;
	background: #ff0000;
	color: white;
	font-size: 11px;
	font-weight: 700;
	border-radius: 4px;
	letter-spacing: 0.5px;
`

export const ProfileImage = styled.img`
	width: 45px;
	height: 45px;
	border-radius: ${({theme}) => theme.borders.maximum};
	margin-right: 8px;
	margin-bottom: 7px;
	&:hover {
			opacity: 0.8;
	}
`;

export const EmptyText = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.text.subtitle};
  color: ${({theme}) => theme.colors.text.normal};
  border-radius: 12px;
  margin-bottom: 10px;
`;

export const LiveTitle = styled.span`
	font-size: ${({theme}) => theme.font.xLarge};
	font-weight: 600;
	color: ${({theme}) => theme.colors.text.normal};
`;

export const StreamerName = styled.span`
	font-size: ${({theme}) => theme.font.large};
	font-weight: 600;
	color: ${({theme}) => theme.colors.text.subtitle};
`;

export const LiveInfo = styled.div`
	display: flex;
`;

export const TitleContainer = styled.div`
	margin-top: 5px;
	display: flex;
	flex-direction: column;
	gap: 3px;
`;