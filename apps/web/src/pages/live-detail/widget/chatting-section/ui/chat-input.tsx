import { useState, useEffect } from "react";
import styled from "styled-components";
import Emoji from "@/app/assets/emoji.svg?react";
import sendPung from "@/app/assets/send-pung.svg";
import Airplane from "@/app/assets/airplane.svg?react";
import { SponsorModal } from "../widget/sponsor-modal";
import { sponsorPung } from "@/features/sponsor/api";
import { fetchMyInfo } from "@/entities/user/api/api";
import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "@/entities/payment/api";
import { sponsorEventManager } from "@/shared/lib/sponsor-event";
import { ISendDonationMessageRequest } from "../model/use-chat";
import { donationApi } from "@/entities/donation/api";

interface ChatInputProps {
  username: string;
  onSend: (message: string) => void;
  addSponsorMessage: (data: ISendDonationMessageRequest) => void;
}

export const ChatInput = ({ username, onSend, addSponsorMessage }: ChatInputProps) => {
  const [text, setText] = useState("");
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [pungAmount, setPungAmount] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [donationType, setDonationType] = useState<string>("");
  const [message, setMessage] = useState<string>("")

  
  const [userCash, setUserCash] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cardId, setCardId] = useState<string>("");
  const [userNickname, setUserNickname] = useState<string>("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  const handleSponsorClick = () => {
    setPungAmount(1000);
    setMessage("");
    setYoutubeUrl("");
    setDonationType("");
    setIsSponsorModalOpen(true);
  };

  const handlePungChange = (amount: number) => {
    setPungAmount(amount);
  };

  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url)
  };
  const handleMessageChange = (message: string) => {
    setMessage(message)
  };
  const handleDonationTypeChange = (type: string) => {
    setDonationType(type)
  };

  
  
  const handleSponsorPung = async () => {
    if (!cardId) {
      console.error("카드 정보가 없습니다.");
      return;
    }

    if (pungAmount > userCash) {
      return;
    }
    
    try {
      console.log("후원 성공:", pungAmount);
      setIsSponsorModalOpen(false);
      
      // 임시로 클라이언트에서 cash 차감
      
      // 후원 후 입력값들 초기화
      setMessage("");
      setYoutubeUrl("");
      setDonationType(""); 
    
      // 사용후 잔액 계산
      const newCash = userCash - pungAmount;

      sponsorEventManager.emit(userNickname, pungAmount);
      switch (donationType) {
        case "cash":
          donationApi.post({
            username:username,
            amount: pungAmount
          }).then(()=> {
            addSponsorMessage({
              roomId: username,   
              message: message, 
              amount: pungAmount, 
              voiceId: "gtbd9NwwnPeKoNkxPtk8Xn",
            });
            setUserCash(newCash);
            setPungAmount(1000);
          }).catch(err=>{
            console.log(`후원실패 ${err.response.message}`)
          })
          
          break;
        case "video":
          donationApi.post({
            username:username,
            amount: pungAmount
          }).then(()=> {
            addSponsorMessage({
              roomId: username,   
              youtube: youtubeUrl,
              amount: pungAmount
            });
            setPungAmount(1000);
          }).catch(err=>{
            console.log(`후원실패 ${err.response.message}`)
          })
          break
        default:
          break;
      }
      

      
      try {
        const result = await fetchMyInfo();
        setUserCash(result.data.cash);
      } catch (error) {
        console.log("서버 동기화 실패, 클라이언트 값 유지");
      }
    } catch (error) {
      console.error("후원 실패:", error);
    }
  };

  const [isComposing, setIsComposing] = useState(false);

  const { data: myInfoData } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const user = myInfoData?.data;
    if (!user) return;
    setUserCash(user.cash);
    setPungAmount(user.cash);
    setUserNickname(user.nickname);
    (async () => {
      try {
        const cardResult = await paymentApi.getCards();
        if (cardResult.data && cardResult.data.length > 0) {
          setCardId(cardResult.data[0].cardId);
        }
      } catch (e) {
        console.warn("카드 로드 실패", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [myInfoData?.data]);

  const inputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const compositionStart = () => {
    setIsComposing(true);
  };

  const compositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <div>
      <Container>
        <Input
          type="text"
          placeholder="채팅을 입력해주세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={inputEnter}
          onCompositionStart={compositionStart}
          onCompositionEnd={compositionEnd}
        />
        <button
          onClick={handleSponsorClick}
          style={{
            display: "flex",
            alignItems: "center",
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
          }}
        >
          <img src={sendPung} alt="" />
        </button>
        <Airplane onClick={handleSend} />
      </Container>

      {isSponsorModalOpen && (
        <ModalOverlay onClick={() => setIsSponsorModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <SponsorModal
              pungAmount={pungAmount}
              onPungChange={handlePungChange}
              onChangeDonationType={handleDonationTypeChange}
              onYoutubeUrlChange={handleYoutubeUrlChange}
              onChangeMessage={handleMessageChange}
              sponsorPung={handleSponsorPung}
              userCash={userCash}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  display: flex;
  align-items: center;
  padding: 12px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.normal};
  justify-content: space-between;
`;
export const Input = styled.input`
  outline: none;
  border: none;
  width: 80%;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  padding: 20px;
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;
