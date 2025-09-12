
import styled from "styled-components";
import { LuArrowRightToLine } from "react-icons/lu";
import MuxVideo from "@mux/mux-video-react";
import Pause from "@/app/assets/pause.svg";

export const LiveDetailContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	padding: 35px;
	gap: 20px;
`;

export const StreamerInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 10px;
`;

export const StreamTitle = styled.span`
	font-size: 24px;
	font-weight: 600;
	color: white;
`;
export const FollowButton = styled.button`
	padding: 0 12px;
	height: 31px;
	border-radius: 12px;
	outline: none;
	border: none;
	background-color: ${({theme}) => theme.colors.secondary.normal};
	display: flex;
	align-items: center;
	gap: 6px;
	white-space: nowrap;
	flex-shrink: 0;
`;

export const FollowButtonText = styled.span`
	font-size: 14px;
	font-weight: 700;
	color: ${({theme}) => theme.colors.common.white};
	flex-shrink: 0;
`;
export const VideoWrapper = styled.div`
	position: relative;
	width: 100%;
	border-radius: 20px;
	
	@media (max-width: 768px) {
		width: 100%;
	}
`;

export const VideoContainer = styled.div`
	width: 100%;
	aspect-ratio: 16 / 9;
	background-color: #a3a3a3;
	border-radius: 20px;
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
`;

export const VideoCenterController = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 5;
	pointer-events: none;
	
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
		background-color: #000;
	}
`;

export const BlankVideo = styled.div`
	width: 100%;
	background-color: gray;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	z-index: 1;
	
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
		background-color: #000;
	}
`;

export const PauseOverlay = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 5;
	
	width: 80px;
	height: 80px;
	background-image: url(${Pause});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	opacity: 0.8;
	pointer-events: none;
	
	@media (max-width: 768px) {
		width: 60px;
		height: 60px;
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

export const BottomController = styled.div<{ $isVisible: boolean }>`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	box-sizing: border-box;
	padding: 0 22px;
	
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
	border-radius: 0 0 20px 20px;
	
	transform: translateY(${(props) => (props.$isVisible ? "0" : "100%")});
	opacity: ${(props) => (props.$isVisible ? 1 : 0)};
	transition: all 0.4s ease;
	
	z-index: 999;
	pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
`;

export const LeftIconContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 22px;
`;
export const RightIconContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`;

export const ChatArea = styled.div`
	width: 30%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border: 1px solid #404040;
	border-radius: 20px;
	
	@media (max-width: 768px) {
		width: 100%;
		margin-top: 20px;
	}
`;

export const ChatHeader = styled.div`
  width: 100%;
  height: 46px;
  border-bottom: 1px solid #404040;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatHeaderText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #a3a3a3;
  margin-right: 30px;
`;

export const ChatHeaderIcon = styled(LuArrowRightToLine)`
  font-size: 20px;
  color: #a3a3a3;
  margin-left: 15px;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const ChattingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const ChattingElemContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 12px;
`;
export const ChattingViewer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const ChattingViewerName = styled.span`
  font-size: 14px;
  font-weight: 800;
`;
export const ChattingMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: white;
`;

export const ChattingInputContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;
export const ChattingInput = styled.div`
  width: 90%;
  height: 40px;
  background-color: #262626;
  border-radius: 8px;
  display: flex;
`;
export const ChattingTextField = styled.input`
  padding-left: 16px;
  width: 75%;
  color: #d4d4d4;
  background-color: #262626;
  font-size: 13px;
  font-weight: 400;
  outline: none;
  border: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const SendContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    font-size: 17px;
    color: #d4d4d4;
  }
  :hover {
    color: white;
  }
`;
export const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    font-size: 24px;
    color: #d4d4d4;
  }
  :hover {
    color: white;
  }
`;

