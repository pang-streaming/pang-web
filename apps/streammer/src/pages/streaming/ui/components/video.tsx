import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import {LiveCanvas} from "@/features/canvas/ui/live-canvas";
import {CanvasSize, Screen} from "@/features/canvas/constants/canvas-constants";
import {VscDebugStart} from "react-icons/vsc";
import { useWhipBroadcast } from "@/features/whip/useWhipBroadcast";
import {useVrmScreen} from "@/features/vrm/hooks/useVrmScreen";

interface VideoProps {
	containerRef: React.RefObject<HTMLDivElement | null>;
	screens: Screen[];
	setScreens: React.Dispatch<React.SetStateAction<Screen[]>>;
	canvasSize: CanvasSize;
  viewers?: number;
  likes?: number;
  vrmUrl: string | null;
  selectedDevice: MediaDeviceInfo | null;
  isVTuberEnabled: boolean;
}

export const Video = ({ 
  screens, 
  setScreens, 
  containerRef, 
  canvasSize, 
  viewers = 123, 
  likes = 456,
  vrmUrl,
  selectedDevice,
  isVTuberEnabled,
}: VideoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
	const { status, startStreaming, stopStreaming } = useWhipBroadcast(
		canvasRef,
		{
      whipUrl: 'http://15.164.229.169:9000/rtc/v1/whip/?app=live&stream=tester',
      bitrate: 8000000,
      fps: 60,
    }
	);
	
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
					<SectionTitle>스트리머님의 방송 ✎</SectionTitle>
					<StatsContainer>
						<StatItem>
							<AiOutlineEye style={{ marginRight: "4px" }} />
							{viewers}
						</StatItem>
						<StatItem>
							<AiOutlineHeart style={{ marginRight: "4px" }} />
							{likes}
						</StatItem>
						<StartButton onClick={startStreaming}>
							<VscDebugStart size={20}/>
						</StartButton>
					</StatsContainer>
				</TitleRow>
				<CanvasContainer ref={containerRef}>
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
  padding: 3% 5%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-bottom: -10%;
`;

const CanvasContainer = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const StartButton = styled.button`
	padding: 8px;
	border-radius: ${({theme}) => theme.borders.small};
	color: ${({theme}) => theme.colors.text.normal};
	background-color: ${({theme}) => theme.colors.content.normal};
	cursor: pointer;
	border: none;
`