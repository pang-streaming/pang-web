import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useLocation, useNavigate } from "react-router-dom";

import * as F from '../../../../features/follow/api'

import * as S from './style'

import { useIsMobile } from "../../../../entities/video/model/useIsMobile";
import { useVideoReady } from "../../../../entities/video/model/useVideoReady";
import { usePip } from "../../../../entities/video/model/usePip";
import { useFullScreen } from "../../../../entities/video/model/useFullScreen";
import { useHlsPlayer } from "../../../../entities/stream/model/useHlsPlayer";
import Pause from "../../assets/icons/pause.svg";
import Resume from "../../assets/icons/resume.svg";
import Sound from "../../assets/icons/sound.svg";
import Muted from "../../assets/icons/sound-muted.svg";
import Controller from "../../assets/icons/controller.svg";
import Pip from "../../assets/icons/pip.svg";
import FullScreen from "../../assets/icons/full-screen.svg";
import Heart from "../../assets/icons/heart.svg";
import HeartFill from "../../assets/icons/heart-fill.svg";
import nomalProfile from "../../assets/images/nomal_profile.svg";
import { FaChevronLeft } from "react-icons/fa6";
import { ChattingSection } from "../chatting-section";
import { useHover } from "@/entities/video/model/useHover";
import { useVolume } from "@/entities/video/model/useVolume";
import { fetchMyInfo } from "@/entities/user/api/api";
import { CustomSlider } from "../chatting-section/ui/custom-slider";
import { useChat } from "../chatting-section/model/useChat";
import { LiveStreamDetailData } from "@/entities/stream/model/type";
import { fetchLiveStreamDetail } from "@/entities/stream/api";

export const LiveSection = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const streamId = String(queryParams.get("streamId"));

  const [streamData, setStreamData] = useState<LiveStreamDetailData>();

  const { chat, setChat, chatList, sendMessage } = useChat(streamId);

  useEffect(() => {
    const fetchLiveStreamData = async () => {
      try {
        const res = await fetchLiveStreamDetail(streamId);
        setStreamData(res.data.data);
      } catch (err) {
        console.error("스트림 불러오는중 실패", err);
      }
    };
    fetchLiveStreamData();
  }, [streamId]);

  const [isComposing, setIsComposing] = useState(false);

  const inputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSendMessage = () => {
    sendMessage();
  };

  const compositionStart = () => {
    setIsComposing(true);
  };

  const compositionEnd = () => {
    setIsComposing(false);
  };

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

  const [followerCount, setFollowerCount] = useState<number>(0);

  useEffect(() => {
    const fetchFollowerCount = async () => {
      if (!streamData?.nickname) return;
      try {
        const res = await F.fetchMyFollower(nickname);
        setFollowerCount(res.data.length);
      } catch (err) {
        console.error("팔로워 수 가져오기 실패", err);
        setFollowerCount(0);
      }
    };
    fetchFollowerCount();
  }, [nickname]);
  useEffect(() => {
    const checkIfFollowing = async () => {
      if (!streamData?.nickname) return;
      try {
        const myInfo = await fetchMyInfo();
        const myUsername = myInfo.data.username;

        const res = await F.fetchMyFollowing(myUsername);
        const isFollowing = res.data.some((user) => user.nickname === nickname);
        setFollow(isFollowing);
      } catch (err) {
        console.error("팔로우 여부 확인 실패", err);
      }
    };

    checkIfFollowing();
  }, [nickname]);

  const handleFollowButton = async () => {
    if (!nickname || isFollowingLoading) return;
    setIsFollowingLoading(true);
    console.log(nickname);
    try {
      const res = await F.followingOtherUser(nickname);
      console.log("팔로우 응답:", res);
      setFollow((prev) => !prev);
    } catch (err) {
      console.error("팔로우 실패", err);
      alert("팔로우 요청에 실패했어요. 잠시 후 다시 시도해 주세요!");
    } finally {
      setIsFollowingLoading(false);
    }
  };

  const [follow, setFollow] = useState(false);
  const [isFollowingLoading, setIsFollowingLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

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

  const getColorForViewer = (viewerName: string) => {
    if (!colorMapRef.current.has(viewerName)) {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      colorMapRef.current.set(viewerName, randomColor);
    }
    return colorMapRef.current.get(viewerName)!;
  };

  const navigate = useNavigate();
  if (!streamData) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        잘못된 접근입니다. 방송 정보를 찾을 수 없어요 😢
      </div>
    );
  }
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
        
          <S.VideoContainer ref={(node) => { hoverRef.current = node as HTMLDivElement; containerRef.current = node; }}>
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
            onClick={handleFollowButton}
            disabled={isFollowingLoading}
          >
            <img
              src={!follow ? Heart : HeartFill}
              style={{ width: 15, height: 13.75 }}
            />
            <S.FollowButtonText>
              {follow ? "언팔로우" : "팔로우"}
            </S.FollowButtonText>
          </S.FollowButton>
        </div>
        <S.StreamerInfo>
          <img
            src={streamData.profileImage ?? nomalProfile}
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
      <ChattingSection />
    </S.LiveDetailContainer>
  );
};
