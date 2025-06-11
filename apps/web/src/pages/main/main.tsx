import { useEffect, useState } from "react";
import { FollowingContainer, FollowingTitle } from "../follow/following.style";
import { GridContainer } from "./main.style";
import dlook from "../../assets/dlook.png";
import { MainLiveCard } from "../explore/livecard/mainlivecard/mainlivecard";
import { InitModal } from "./widgets/init-modal/init-modal";


export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const userid = localStorage.getItem("userid") || "사용자";


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
        <span>{userid}님의<br/>나이와 성별을 선택해주세요!</span>
      </InitModal>
    </FollowingContainer>
  );
};
