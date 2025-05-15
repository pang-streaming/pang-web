import { useLocation } from "react-router-dom";
import { MainLiveProps } from "../explore/livecard/mainlivecard/mainlivecard.props";
import {MainStreamerName,StreamInfo,} from "../explore/livecard/mainlivecard/mainlivecard.style";
import { ProfileImage } from "../explore/livecard/livecard.style";
import { FollowerCount } from "../../components/followingcard/followingcard.style";
import munjioppa from "../../assets/munjioppa.png";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaRegFaceLaugh } from "react-icons/fa6";
import { SponsorshipBadgeContainer } from "./components/sponsorship-badge/sponsorship-badge-container";
import { NoticeBox } from "./components/notice-box/notice-box";
import * as S from './livedetail.style';
export const LiveDetail = () => {
  const [chat, setChat] = useState("");
  const [viewers, setViewer] = useState([
    {
      id: 1,
      viewerName: "만다린 상은",
      chatting: "하이",
      color: "#9747FF",
    },
    {
      id: 2,
      viewerName: "감귤",
      chatting: "안녕하세요",
      color: "#FAB04A",
    },
    {
      id: 3,
      viewerName: "대구에듀",
      chatting: "반갑노",
      color: "#0389FF",
    },
    {
      id: 4,
      viewerName: "레고러브",
      chatting: "유하",
      color: "#FF99BB",
    },
    {
      id: 5,
      viewerName: "민덕사랑",
      chatting: "??",
      color: "#7FD880",
    },
  ]);

  // 더미채팅

  const appendChat = () => {
    if (chat.trim() === "") return;

    const newChat = {
      id: viewers.length + 1,
      viewerName: "선유입니다",
      chatting: chat,
      color: S.randomColor(),
    };

    setViewer([...viewers, newChat]);
    setChat("");
  };
  const [isComposing, setIsComposing] = useState(false);
  const inputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      appendChat();
    }
  };

  const compositionStart = () => {
    setIsComposing(true);
  };

  const compositionEnd = () => {
    setIsComposing(false);
  };

  const location = useLocation();
  const live = location.state as MainLiveProps;

  return (
    <S.LiveDetailContainer>
      <S.VideoContainer>
        {/* <Video src={live.thumbnail} alt="ddddd"/> */}
        <S.Video src={munjioppa} />
        <StreamInfo>
          <ProfileImage src={live.profileImage} />
          <MainStreamerName>{live.streamerName}</MainStreamerName>
          <FollowerCount>{live.followerCount}18.8 만명</FollowerCount>
        </StreamInfo>
      </S.VideoContainer>
      <S.ChatArea>
        <S.ChatHeader>
          <S.ChatHeaderIcon />
          <S.Spacer />
          <S.ChatHeaderText>채팅</S.ChatHeaderText>
          <S.Spacer />
        </S.ChatHeader>
        <S.ChattingContainer>
        <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <SponsorshipBadgeContainer />
        <NoticeBox />
    </div>


          <S.ChattingElemContainer>
            {viewers.map((viewer) => (
              <S.ChattingViewer key={viewer.id}>
                <S.ChattingViewerName style={{ color: viewer.color }}>
                  {viewer.viewerName}
                </S.ChattingViewerName>
                <S.ChattingMessage>{viewer.chatting}</S.ChattingMessage>
              </S.ChattingViewer>
            ))}
          </S.ChattingElemContainer>
          <S.Spacer />
          <S.ChattingInputContainer>
            <S.ChattingInput>
              <S.ChattingTextField
                type="text"
                placeholder="채팅창 문구"
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                onKeyDown={inputEnter}
                onCompositionStart={compositionStart}
                onCompositionEnd={compositionEnd}
              />
              <S.SendContainer>
                <S.EmojiButton>
                  <FaRegFaceLaugh />
                </S.EmojiButton>
                <S.SendButton onClick={appendChat}>
                  <IoSend />
                </S.SendButton>
              </S.SendContainer>
            </S.ChattingInput>
          </S.ChattingInputContainer>
        </S.ChattingContainer>
      </S.ChatArea>
    </S.LiveDetailContainer>
  );
};
