import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { LiveCanvas } from "@/features/canvas/ui/live-canvas";
import {
  type CanvasSize,
  type Screen,
} from "@/features/canvas/constants/canvas-constants";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";
import { useVrmScreen } from "@/features/vrm/hooks/useVrmScreen";
import { useSocketBroadcast } from "@/features/whip/useSocketBroadcast";
import { useAudioMixer } from "@/features/audio/hooks/useAudioMixer";
import { AppDownloadModal } from "@/features/modal/components/AppDownloadModal";

interface VideoProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  screens: Screen[];
  setScreens: React.Dispatch<React.SetStateAction<Screen[]>>;
  canvasSize: CanvasSize;
  streamKey: string;
  username: string;
  vrmUrl: string | null;
  selectedDevice: MediaDeviceInfo | null;
  isVTuberEnabled: boolean;
  vrmSourceName: string;
  title: string;
  onTitleClick: () => void;
  titleChild: React.ReactNode;
  rtmpUrls?: string[];
}

export const Video = ({
  screens,
  setScreens,
  containerRef,
  canvasSize,
  streamKey,
  username,
  vrmUrl,
  selectedDevice,
  isVTuberEnabled,
  vrmSourceName,
  titleChild,
  rtmpUrls,
}: VideoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 오디오 믹서에서 믹싱된 트랙 가져오기 (마이크 + 화면공유 오디오 등)
  const { mixedTrack, resumeAudioContext } = useAudioMixer();

  const {
    isStreaming,
    startStreaming,
    stopStreaming,
    showDownloadModal,
    closeDownloadModal,
    downloadApp,
  } = useSocketBroadcast(
    canvasRef,
    streamKey,
    rtmpUrls,
    mixedTrack,
    resumeAudioContext
  );

  const { screen: vrmScreen, VrmRenderer } = useVrmScreen(
    canvasSize,
    vrmUrl,
    isVTuberEnabled && !!selectedDevice,
    selectedDevice,
    vrmSourceName
  );

  useEffect(() => {
    if (vrmScreen && isVTuberEnabled) {
      setScreens((prev) => {
        const existingVrmIndex = prev.findIndex((s) => s.type === "canvas");
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
      setScreens((prev) => prev.filter((s) => s.type !== "canvas"));
    }
  }, [vrmScreen, setScreens, isVTuberEnabled]);

  return (
    <>
      {isVTuberEnabled && selectedDevice && <VrmRenderer />}
      <AppDownloadModal
        isOpen={showDownloadModal}
        onClose={closeDownloadModal}
        onDownload={downloadApp}
      />
      <LiveContainer>
        <TitleRow>
          {titleChild}
          <StatsContainer>
            <StartButton
              $isStarted={isStreaming.current}
              onClick={isStreaming.current ? stopStreaming : startStreaming}
            >
              {isStreaming.current ? (
                <VscDebugStop size={20} />
              ) : (
                <VscDebugStart size={20} />
              )}
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
          <LiveCanvas
            canvasRef={canvasRef}
            screens={screens}
            setScreens={setScreens}
            canvasSize={canvasSize}
          />
        </CanvasContainer>
      </LiveContainer>
    </>
  );
};

const LiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 12px;
  padding: 12px;
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
`;

const DonationEmbed = styled.iframe`
  position: absolute;
  z-index: 5;
  left: 50px;
  top: 50px;
  pointer-events: none;
  border: none;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StartButton = styled.button<{ $isStarted: boolean }>`
  padding: 8px;
  border-radius: ${({ theme }) => theme.borders.small};
  color: ${({ theme }) => theme.colors.text.normal};
  background-color: ${({ theme, $isStarted }) =>
    $isStarted ? theme.colors.primary.normal : theme.colors.content.normal};
  cursor: pointer;
  border: none;
`;
