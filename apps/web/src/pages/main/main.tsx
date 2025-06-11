import { useEffect, useState } from "react";
import { FollowingContainer, FollowingTitle } from "../follow/following.style";
import { GridContainer } from "./main.style";
import dlook from "../../assets/dlook.png";
import { MainLiveCard } from "../explore/livecard/mainlivecard/mainlivecard";
import { InitModal } from "./widgets/init-modal";

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true); // 첫 렌더 시 모달 열기
  }, []);

  const lives = [
    {
      id: 1,
      profileImage: dlook,
      streamerName: "먼지오빠",
      title: "안녕하세요",
    },
    {
      id: 2,
      profileImage: dlook,
      streamerName: "먼지오빠",
      title: "안녕하세요",
    },
    {
      id: 3,
      profileImage: dlook,
      streamerName: "먼지오빠",
      title: "안녕하세요",
    },
  ];

  return (
    <FollowingContainer>
      <MainLiveCard
        thumbnail={dlook}
        profileImage={dlook}
        streamerName="파뿌리"
        followerCount={18.2}
        viewerCount={201}
        category="마인크래프트"
        badge={true}
      />

      <FollowingTitle>이 방송 어때요?</FollowingTitle>

      <GridContainer>
        {/* lives.map 돌리면서 라이브 카드들 렌더링 가능 */}
      </GridContainer>

      <InitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>환영합니다!</h2>
        <p>로그인 후 처음 보는 모달입니다.</p>
      </InitModal>
    </FollowingContainer>
  );
};
