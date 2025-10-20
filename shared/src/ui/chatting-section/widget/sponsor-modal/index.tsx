import styled from "styled-components";
import * as W from "./widget/index";
import { SegmentButtonGroup, SubmitButton } from "@pang/shared/ui";
import { useState } from "react";
import { VoiceSelector, ttsVoiceList } from "./widget/voice-selector";

interface SponsorModalProps {
  pungAmount: number;
  onPungChange: (amount: number) => void;
  onYoutubeUrlChange: (url: string) => void;
  onChangeDonationType: (type: string) => void;
  onChangeMessage: (message: string) => void;
  sponsorPung: () => void;
  userCash: number;
  selectedVoiceId: string;
  onVoiceSelect: (voiceId: string) => void;
}

function extractYouTubeID(url: string) {
  try {
    const urlObj = new URL(url);
    const id = urlObj.searchParams.get("v");
    if (id) return id;
  } catch (e) {}

  const idPattern = /^[a-zA-Z0-9_-]{11}$/;
  if (idPattern.test(url)) return url;

  return null;
}

export const SponsorModal = ({
  pungAmount,
  onPungChange,
  sponsorPung,
  onYoutubeUrlChange,
  onChangeDonationType,
  onChangeMessage,
  userCash,
  selectedVoiceId,
  onVoiceSelect,
}: SponsorModalProps) => {
  const isInsufficient = pungAmount > userCash;
  const [selectedDonationType, setSelectedDonationType] = useState("cash");
  const [isVoiceSelectorOpen, setIsVoiceSelectorOpen] = useState(false);

  const donationCategory = [
    {
      id: "cash",
      name: "펑 후원",
    },
    {
      id: "video",
      name: "영상 후원",
    },
  ];

  const handleDonationTypeChange = (type: string) => {
    setSelectedDonationType(type);
    onChangeDonationType(type);
  };

  return (
    <Container>
      <SegmentButtonGroup
        segments={donationCategory}
        defaultSegmentIndex={0}
        onSegmentChange={handleDonationTypeChange}
      />
      <W.MyPungField userCash={userCash} />
      <W.IncreaseField pungAmount={pungAmount} onPungChange={onPungChange} />
      {selectedDonationType == "video" ? (
        <W.YoutubeField
          onYoutubeUrlChange={(url: string) => {
            const extractUrl = extractYouTubeID(url);
            if (extractUrl != null) onYoutubeUrlChange(extractUrl);
          }}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <W.MessageField onMessageChange={onChangeMessage} />
          <VoiceSelectRow>
            <VoiceLabel>목소리 선택하기</VoiceLabel>
            <VoiceSelectButton onClick={() => setIsVoiceSelectorOpen(true)}>
              {ttsVoiceList.find(v => v.id === selectedVoiceId)?.name || "음성 선택"}
            </VoiceSelectButton>
          </VoiceSelectRow>
        </div>
      )}

      <W.AgreeRow />
      {isInsufficient && (
        <InsufficientWarning>
          ⚠️ 보유 펑이 부족합니다 (보유: {userCash.toLocaleString()}개)
        </InsufficientWarning>
      )}
      <SubmitButton onClick={sponsorPung} disabled={isInsufficient}>
        펑 후원하기
      </SubmitButton>

      {isVoiceSelectorOpen && (
        <VoiceSelector
          selectedVoiceId={selectedVoiceId}
          onVoiceSelect={onVoiceSelect}
          onClose={() => setIsVoiceSelectorOpen(false)}
        />
      )}
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

const VoiceSelectRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const VoiceLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: ${({ theme }) => theme.font.medium};
`;

const VoiceToggle = styled.span`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: ${({ theme }) => theme.font.medium};
`;

const VoiceSelectButton = styled.button`
  color: ${({ theme }) => theme.colors.primary.normal};
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;
