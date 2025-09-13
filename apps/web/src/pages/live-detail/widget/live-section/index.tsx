import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from './style'
import { useIsMobile } from "@/entities/video/model/useIsMobile";
import { useVideoReady } from "@/entities/video/model/useVideoReady";
import { usePip } from "@/entities/video/model/usePip";
import { useFullScreen } from "@/entities/video/model/useFullScreen";
import { useHlsPlayer } from "@/entities/stream/model/useHlsPlayer";
import Pause from "@/app/assets/pause.svg";
import Resume from "@/app/assets/resume.svg";
import Sound from "@/app/assets/sound.svg";
import Muted from "@/app/assets/sound-muted.svg";
import Controller from "@/app/assets/controller.svg";
import Pip from "@/app/assets/pip.svg";
import FullScreen from "@/app/assets/full-screen.svg";
import Heart from "@/app/assets/heart.svg";
import HeartFill from "@/app/assets/heart-fill.svg";
import nomalProfile from "@/app/assets/images/normal_profile.svg";
import { FaChevronLeft } from "react-icons/fa6";
import { useHover } from "@/entities/video/model/useHover";
import { useVolume } from "@/entities/video/model/useVolume";
import { CustomSlider } from "../chatting-section/ui/custom-slider";
import { useStreamDetail } from "./model/useStreamDetail";
import { useFollowInfo } from "./model/useFollowInfo";

export const LiveSection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const streamId = String(queryParams.get("streamId"));

  const { streamData } = useStreamDetail(streamId);


  const [hoverRef, hover] = useHover<HTMLDivElement>();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { volume, muted, updateVolume, toggleMuted } = useVolume(videoRef);

  const [pause, setPause] = useState(false);
  const handlePause = () => {
    setPause(!pause);
  };
  
  const { handleFullScreen } = useFullScreen(containerRef);

  const videoReady = useVideoReady(videoRef);

  const { handlePip } = usePip(videoRef, videoReady);

  const isMobile = useIsMobile();
  const hlsRef = useRef<Hls | null>(null);

  useHlsPlayer(videoRef, streamData?.url);

  const nickname = streamData?.nickname || "unknown_user";
  const { followerCount, isFollowing, isLoading, toggleFollow } = useFollowInfo(streamData?.nickname);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);

    video.addEventListener("timeupdate", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
  const colorMapRef = useRef<Map<string, string>>(new Map());


  const navigate = useNavigate();
  return (
    <S.LiveDetailContainer>
      {isMobile && (
        <FaChevronLeft
          size={24}
          onClick={() => {
            navigate("/");
          }}
        />
      )}
      <S.VideoWrapper>
        
          <S.VideoContainer ref={hoverRef}>
            <S.VideoWrapperInner >
              {streamData && (
                <S.VideoOverlayArea >
                  <S.Video
                    ref={videoRef}
                    type="application/vnd.apple.mpegurl"
                    autoPlay
                    muted={muted}
                    onClick={handlePause}
                  />
                </S.VideoOverlayArea>
              )}
              {pause && (
                <S.VideoCenterController>
                  <img src={Pause} alt="pause" />
                </S.VideoCenterController>
              )}
              <S.BottomController $isVisible={hover}>
                <S.LeftIconContainer>
                  <img src={pause ? Pause : Resume} alt="" />
                  <span>{formatTime(currentTime)}</span>
                  <img
                    src={muted || volume === 0 ? Muted : Sound}
                    alt=""
                    onClick={toggleMuted}
                  />

                  <CustomSlider value={volume} onChange={updateVolume} />
                </S.LeftIconContainer>
                <S.RightIconContainer>
                  <img src={Controller} alt="" />
                  <img src={Pip} alt="" onClick={handlePip} />
                  <img src={FullScreen} alt="" onClick={handleFullScreen} />
                </S.RightIconContainer>
              </S.BottomController>
            </S.VideoWrapperInner>
          </S.VideoContainer>
        
          {isMobile &&<S.BottomControllerMobile>
            <S.LeftIconContainer>
              <img src={pause ? Pause : Resume} alt="" />
              <span>{formatTime(currentTime)}</span>

            </S.LeftIconContainer>
            <S.RightIconContainer>
              <img src={Controller} alt="" />
              <img src={Pip} alt="" onClick={handlePip} />
              <img src={FullScreen} alt="" onClick={handleFullScreen} />
            </S.RightIconContainer>
          </S.BottomControllerMobile>     }
        <div
          style={{
            display: "flex",
            marginTop: 18,
            justifyContent: "space-between",
          }}
        >
     
          <S.StreamTitle>{streamData?.title ?? "제목 없는 방송"}</S.StreamTitle>

          <S.FollowButton
            onClick={toggleFollow}
            disabled={isLoading}
          >
            <img
              src={!isFollowing ? Heart : HeartFill}
              style={{ width: 15, height: 13.75 }}
            />
            <S.FollowButtonText>
              {isFollowing ? "언팔로우" : "팔로우"}
            </S.FollowButtonText>
          </S.FollowButton>
        </div>
        <S.StreamerInfo>
          <img
            src={/* streamData.profileImage ??*/  nomalProfile}
            alt=""
            style={{ width: 60, height: 60, borderRadius: "50%" }}
          />
          <div>{nickname}</div>

          <div>
            <div style={{ fontSize: 12, color: "#999" }}>
              팔로워 {followerCount.toLocaleString()}명
            </div>
          </div>
        </S.StreamerInfo>
      </S.VideoWrapper>
    </S.LiveDetailContainer>
  );
};
