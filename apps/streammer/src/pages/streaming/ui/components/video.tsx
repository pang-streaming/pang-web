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
  viewers?: number; // 시청자 수
  likes?: number;   // 좋아요 수
}

export const Video = ({ screens, setScreens, containerRef, canvasSize, viewers = 123, likes = 456 }: VideoProps) => {
	const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
	const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
	const { status, startStreaming, stopStreaming } = useWhipBroadcast(
		canvasRef,
		{
      whipUrl: 'https://whip.vdo.ninja',
      bitrate: 8000000,
      fps: 60,
      bearerToken: 'daedyu'
    }
	);
	const { screen: vrmScreen, VrmRenderer } = useVrmScreen(canvasSize, null, true, selectedDevice);
	
	useEffect(() => {
		const getDevices = async () => {
			try {
				await navigator.mediaDevices.getUserMedia({ video: true }); // 권한 요청
				const availableDevices = await navigator.mediaDevices.enumerateDevices();
				const videoDevices = availableDevices.filter(device => device.kind === 'videoinput');
				setDevices(videoDevices);
				if (videoDevices.length > 0 && !selectedDevice) {
					setSelectedDevice(videoDevices[0]);
				}
			} catch (err) {
				console.error("카메라 접근 오류:", err);
			}
		};
		getDevices();
   }, []);
	
	useEffect(() => {
		if (vrmScreen) {
			setScreens(prev => {
				const existingVrmIndex = prev.findIndex(s => s.id === 999);
				if (existingVrmIndex !== -1) {
					const newScreens = [...prev];
					newScreens[existingVrmIndex] = vrmScreen;
					return newScreens;
				} else {
					return [...prev, vrmScreen];
				}
			});
		}
	}, [vrmScreen, setScreens]);

	return (
		<>
			<VrmRenderer />
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
						<select
						  onChange={(e) => {
						    const device = devices.find(d => d.deviceId === e.target.value);
						    setSelectedDevice(device || null);
							}}
						  value={selectedDevice?.deviceId || ''}
						>
							{devices.map(device => (
								<option key={device.deviceId} value={device.deviceId}>
						      {device.label || `Camera ${devices.indexOf(device) + 1}`}
								</option>
							))}
						</select>
					</StatsContainer>
				</TitleRow>
				<CanvasContainer ref={containerRef}>
					<LiveCanvas canvasRef={canvasRef} screens={screens} setScreens={setScreens} canvasSize={canvasSize} />
				</CanvasContainer>
			</LiveContainer>
		</>
  );
};

/* Styled */
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