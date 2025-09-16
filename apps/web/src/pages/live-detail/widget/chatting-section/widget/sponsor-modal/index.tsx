import styled from "styled-components";
import * as W from './widget/index';
import { SegmentButtonGroup, SubmitButton } from "@pang/shared/ui";
import { useState } from "react";
import { Input } from "../../ui/chat-input";

interface SponsorModalProps {
  pungAmount: number;
  onPungChange: (amount: number) => void;
  onYoutubeUrlChange: (url:string) => void;
  onChangeDonationType: (type:string) => void;
  onChangeMessage: (message:string) => void;
  sponsorPung: () => void;
  userCash: number;
}

function extractYouTubeID(url:string) {
  try {
    const urlObj = new URL(url);
    const id = urlObj.searchParams.get('v');
    if (id) return id;
  } catch (e) {
  
  }

  const idPattern = /^[a-zA-Z0-9_-]{11}$/;
  if (idPattern.test(url)) return url;

  return null;
}

export const SponsorModal = ({ pungAmount, onPungChange, sponsorPung, onYoutubeUrlChange, onChangeDonationType, onChangeMessage, userCash }: SponsorModalProps) => {
  const isInsufficient = pungAmount > userCash;
  const [selectedDonationType, setSelectedDonationType] = useState("cash");

  const donationCategory = [
    {
      id: "cash",
	    name: "펑 후원"
    },
    {
      id: "video",
	    name: "영상 후원"
    }
  ];

  const handleDonationTypeChange = (type:string) => {
    setSelectedDonationType(type);
    onChangeDonationType(type)
  }

  return (
    <Container>
      <SegmentButtonGroup 
        segments={donationCategory} 
        defaultSegmentIndex={0}
        onSegmentChange={handleDonationTypeChange}
      />
      <W.MyPungField userCash={userCash}/>
      <W.IncreaseField pungAmount={pungAmount} onPungChange={onPungChange} />
      {selectedDonationType == "video" ? 
        (
          <W.YoutubeField onYoutubeUrlChange={(url:string)=> {
            const extractUrl = extractYouTubeID(url)
            if (extractUrl != null)
              onYoutubeUrlChange(extractUrl)
          }}/>
        ) 
        : 
        (<W.MessageField onMessageChange={onChangeMessage}/>)
       
      }
      
      <W.AgreeRow />
      {isInsufficient && (
        <InsufficientWarning>
          ⚠️ 보유 펑이 부족합니다 (보유: {userCash.toLocaleString()}개)
        </InsufficientWarning>
      )}
      <SubmitButton 
        onClick={sponsorPung}
        disabled={isInsufficient}
      >
        펑 후원하기
      </SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  user-select: none;
`;

const InsufficientWarning = styled.div`
  background-color: #ffebee;
  border: 1px solid #f44336;
  border-radius: 8px;
  padding: 12px;
  color: #d32f2f;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

