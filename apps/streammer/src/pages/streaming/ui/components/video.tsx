import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {LiveCanvas} from "@/features/canvas/ui/live-canvas";
import { type CanvasSize, type Screen } from "@/features/canvas/constants/canvas-constants";
import {VscDebugStart, VscDebugStop} from "react-icons/vsc";
import { useWhipBroadcast } from "@/features/whip/useWhipBroadcast";
import {useVrmScreen} from "@/features/vrm/hooks/useVrmScreen";

interface VideoProps {
	containerRef: React.RefObject<HTMLDivElement | null>;
	screens: Screen[];
	setScreens: React.Dispatch<React.SetStateAction<Screen[]>>;
	canvasSize: CanvasSize;
  streamKey: string;
	whipUrl: string | null;
	username: string;
  vrmUrl: string | null;
  selectedDevice: MediaDeviceInfo | null;
  isVTuberEnabled: boolean;
  title: string;
  onTitleClick: () => void;
  titleChild: React.ReactNode;
}

export const Video = ({ 
	screens, 
	setScreens, 
	containerRef, 
	canvasSize, 
	streamKey,
	whipUrl,
	username,
	vrmUrl,
	selectedDevice,
	isVTuberEnabled,
	titleChild,
}: VideoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
	const { isStreaming, startStreaming, stopStreaming } = useWhipBroadcast(canvasRef, streamKey, whipUrl);
	
	const { screen: vrmScreen, VrmRenderer } = useVrmScreen(
	  canvasSize, 
	  vrmUrl, 
	  isVTuberEnabled && !!selectedDevice, 
	  selectedDevice
	);
	
	useEffect(() => {
		if (vrmScreen && isVTuberEnabled) {
			setScreens(prev => {
				const existingVrmIndex = prev.findIndex(s => s.id === 999);
				if (existingVrmIndex !== -1) {
					const existingScreen = prev[existingVrmIndex];
					const newScreens = [...prev];
					newScreens[existingVrmIndex] = {
					  ...vrmScreen,
					  x: existingScreen.x,
					  y: existingScreen.y,
					  width: existingScreen.width,
					  height: existingScreen.height,
					};
					return newScreens;
				} else {
					return [...prev, vrmScreen];
				}
			});
		} else if (!isVTuberEnabled) {
		  setScreens(prev => prev.filter(s => s.id !== 999));
		}
	}, [vrmScreen, setScreens, isVTuberEnabled]);
	
	return (
		<>
			{isVTuberEnabled && selectedDevice && <VrmRenderer />}
			<LiveContainer>
				<TitleRow>
					{titleChild}
					<StatsContainer>
						<StartButton isStarted={isStreaming.current} onClick={startStreaming}>
							{isStreaming.current ? <VscDebugStop size={20}/> : <VscDebugStart size={20}/>}
						</StartButton>
					</StatsContainer>
				</TitleRow>
				<CanvasContainer ref={containerRef}>
					<DonationEmbed
						width="550"
						height="350"
						allow="autoplay"
						src={`https://pang-embed.euns.dev/events/donation?username=${username}`}
					/>
					<ChattingEmbed
						src={`https://pang-embed.euns.dev/events/chat?username=${username}`}
					/>
					<LiveCanvas canvasRef={canvasRef} screens={screens} setScreens={setScreens} canvasSize={canvasSize} />
				</CanvasContainer>
			</LiveContainer>
		</>
  );
};

const LiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 16px;
  padding: 20px;
`;

const CanvasContainer = styled.div`
  display: flex;
	flex: 1;
	position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ChattingEmbed = styled.iframe`
	position: absolute;
  z-index: 5;
	right: 0;
  pointer-events: none;
	border: none;
`

const DonationEmbed = styled.iframe`
	position: absolute;
  z-index: 5;
	left: 50px;
	top: 50px;
  pointer-events: none;
	border: none;
`

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StartButton = styled.button<{isStarted: boolean}>`
	padding: 8px;
	border-radius: ${({theme}) => theme.borders.small};
	color: ${({theme}) => theme.colors.text.normal};
	background-color: ${({theme, isStarted}) => isStarted ? theme.colors.primary.normal : theme.colors.content.normal};
	cursor: pointer;
	border: none;
`;