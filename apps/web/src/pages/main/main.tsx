import { useEffect, useState } from "react";
import { FollowingContainer, FollowingTitle } from "../follow/following.style";
import { GridContainer } from "./main.style";
import { InitModal } from "./widgets/init-modal/init-modal";
import { fetchPopularVideos, fetchVideos } from "../../services/video";
import { Video } from "../../types/video";
import { LiveCard } from "../explore/livecard/livecard";
import {fetchMyInfo} from "../../services/user.ts";

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  const [videos, setVideos] = useState<Video[]>([]);
  const [popularVideos, setPopularVideos] = useState<Video[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const token = localStorage.getItem("accessToken");
      console.log("함수 실행");
      console.log(`토큰 : ${token}`);
      console.log("fetchVideos 요청 보냄");
      const result = await fetchVideos();
      console.log("받아온 영상:", result);
      setVideos(result);
    };
    getVideos();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await fetchMyInfo();
      console.log(`내 정보 :`);
      console.log(result);
    }
    getUserInfo()
  }, []);

  useEffect(() => {
    const getPopularVideos = async () => {
      console.log("fetchPopularVideos 요청 보냄");
      const result = await fetchPopularVideos();
      console.log("받아온 인기영상:", result);
      setPopularVideos(result);
    };
    getPopularVideos();
  }, []);
  const userid = localStorage.getItem("userid") || "사용자";

  return (
    <FollowingContainer>
      <FollowingTitle>이 방송 어때요?</FollowingTitle>

      {videos.length === 0 ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1.2rem",
            color: "#777",
            textAlign: "center",
          }}
        >
          영상이 없습니다.
        </div>
      ) : (
        <GridContainer>
          {popularVideos.map((video, idx) => (
            <LiveCard
              key={idx}
              streamImage={video.streamImage}
              profileImage={video.profileImage}
              title={video.title}
              nickname={video.nickname}
              badgeImage={video.badgeImage}
              streamUrl={video.streamUrl} 
            />
          ))}
        </GridContainer>
      )}

      <InitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <span>
          {userid}님의
          <br />
          나이와 성별을 선택해주세요!
        </span>
      </InitModal>
    </FollowingContainer>
  );
};

