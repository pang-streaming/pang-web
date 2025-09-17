import styled from "styled-components";
import MuxVideo from "@mux/mux-video-react";

export const LiveDetailContainer = styled.div`
	width:  calc(100% - 435px);
	display: flex;
	flex-direction: row;
`;

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const VideoContainer = styled.div`
	width: 100%;
	aspect-ratio: 16 / 9;
	background-color: ${({theme}) => theme.colors.content.normal};
	border-radius: ${({theme}) => theme.borders.xxlarge};
`;

export const VideoWrapperInner = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	
	&:fullscreen,
	&:-webkit-full-screen,
	&:-moz-full-screen {
		border-radius: 0;
		background-color: #${({theme}) => theme.colors.background.normal};
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const VideoOverlayArea = styled.div`
	width: 100%;
	height: 100%;
	pointer-events: none;
	
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: auto; 
	}
	
	&:fullscreen,
	&:-webkit-full-screen,
	&:-moz-full-screen {
		width: 100vw;
		height: 100vh;
		
		video {
			width: 100vw;
			height: 100vh;
			object-fit: contain;
		}
	}
`;

export const VideoCenterController = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 5;
	pointer-events: none;
	color: ${({theme}) => theme.colors.common.white};
	
	img {
		width: 60px;
		height: 60px;
	}
`;

export const Video = styled(MuxVideo)`
	width: 100%;
	background-color: gray;
	display: block;
	border-radius: 20px;
	z-index: 1;
	pointer-events: none;
	
	&:fullscreen,
	&:-webkit-full-screen,
	&:-moz-full-screen {
		width: 100vw;
		height: 100vh;
		border-radius: 0;
		object-fit: contain;
		
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: ${({theme}) => theme.colors.background.normal};
	}
`;

export const BottomControllerMobile = styled.div`
	width: 100%;
	height: 50px;
	box-sizing: border-box;
	padding: 0 22px;
	
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	border-radius: 0 0 20px 20px;
	
	transition: all 0.4s ease;
	
	z-index: 2;
	pointer-events: auto;
`;

export const BottomController = styled.div<{ isVisible: boolean }>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 22px;
		
		color: ${({theme}) => theme.colors.common.white};
		
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(47, 47, 47, 0.3));
    border-radius: 0 0 20px 20px;

    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transition: all 0.3s ease;
    z-index: 12;
    user-select: none;
    pointer-events: ${(props) => (props.isVisible ? "auto" : "none")};
`;

export const LeftIconContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 22px;
	justify-content: center;
	text-align: center;
`;
export const RightIconContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`;

export const VolumeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;

  &:hover {
    cursor: pointer;
  }
`;