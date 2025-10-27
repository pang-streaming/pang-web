import { useEffect, useState } from "react";
import { IStreamDataResponse } from "@/entities/video/model/type";
import { getStreamData } from "@/entities/video/api/api";
import { ChattingSection as SharedChattingSection } from "@pang/shared/ui";
import ChattingArrow from "@/app/assets/chatting-arrow.svg?react";
import sendPung from "@/app/assets/send-pung.svg";
import Airplane from "@/app/assets/airplane.svg?react";
import { fetchMyInfo } from "@/entities/user/api";
import { paymentApi } from "@/entities/payment/api";
import { useChat } from "./model/use-chat";

export const ChattingSection = ({streamId}:{streamId: string}) => {
  const [streamData, setStreamData] = useState<IStreamDataResponse | null>(null);

  useEffect(() => {
    if (!streamId) return;

    const fetchStreamData = async () => {
      try {
        const data = await getStreamData(streamId);
        setStreamData(data);
      } catch (err) {
        console.error("스트림 데이터 불러오기 실패", err);
      }
    };

    fetchStreamData();
  }, [streamId]);

  const { chatList, sendMessage, addSponsorMessage } = useChat(streamData?.username ?? "");

  if (!streamData) return <div>Loading...</div>;

  return (
    <SharedChattingSection
      streamId={streamId}
      username={streamData.username}
      chatList={chatList}
      sendMessage={sendMessage}
      addSponsorMessage={addSponsorMessage}
      ChattingArrowIcon={ChattingArrow}
      fetchMyInfo={fetchMyInfo}
      paymentApi={paymentApi}
      sendPungIcon={sendPung}
      AirplaneIcon={Airplane}
    />
  );
};
