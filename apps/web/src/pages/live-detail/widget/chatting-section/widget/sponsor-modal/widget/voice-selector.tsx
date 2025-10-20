import styled from "styled-components";

export interface VoiceProfile {
  id: string;
  name: string;
  description: string;
  image?: string;

}

export const ttsVoiceList: VoiceProfile[] = [
  {
    id: "gtbd9NwwnPeKoNkxPtk8Xn",
    name: "학생회장 김민규",
    description: "부드럽고 똑부러지는 남자 목소리",
  },
  {
    id: "fUcdhZQjt5BE6wUwoJx6Ez",
    name: "걸걸 이상은",
    description: "가래 낀 긁직한 남자 목소리",
  },
  {
    id: "a7EMK11au1vKeG4sHcjnMs",
    name: "교회오빠 이기찬",
    description: "가수 이기찬의 감미로운 목소리",
  },
  {
    id: "fne4YQatgToumRdFoqUe7F",
    name: "전남친 최장우",
    description: "미련 넘치는 전남친 목소리",
  },
  {
    id: "rHZTZAvCHevJhGyKDwxPPP",
    name: "취준생 김강연",
    description: "건장한 남성의 목소리",
  },
  {
    id: "nXVS22Jj2nFQjhLgpXMEiC",
    name: "박민주",
    description: "모기처럼 앵앵대는 얄미운 목소리",
  },
  {
    id: "ae85ZgafzQtGj4oBXa7kzs",
    name: "스윗한남 심서훈 1",
    description: "오글거리는 스윗맨 목소리",
  },
  {
    id: "hgmi9AtPDrKJYGQKHpZMSv",
    name: "스윗한남 심서훈 2",
    description: "좀 더 오글거리는 스윗맨 목소리",
  },
];

interface VoiceSelectorProps {
  selectedVoiceId: string;
  onVoiceSelect: (voiceId: string) => void;
  onClose: () => void;
}

export const VoiceSelector = ({ selectedVoiceId, onVoiceSelect, onClose }: VoiceSelectorProps) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>음성 선택</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <VoiceList>
          {ttsVoiceList.map((voice) => (
            <VoiceItem
              key={voice.id}
              selected={selectedVoiceId === voice.id}
              onClick={() => {
                onVoiceSelect(voice.id);
                onClose();
              }}
            >
              <VoiceName>{voice.name}</VoiceName>
              <VoiceDescription selected={selectedVoiceId === voice.id}>{voice.description}</VoiceDescription>
            </VoiceItem>
          ))}
        </VoiceList>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.normal};
  border-radius: ${({ theme }) => theme.borders.xlarge};
  width: 90%;
  max-width: 500px;
  max-height: 70vh;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.subtitle};
  padding: 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.normal};
  }
`;
const VoiceList = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
`;

const VoiceItem = styled.button<{ selected: boolean }>`
  width: 100%;
  padding: 16px;
  border: 2px solid
    ${({ selected, theme }) => (selected ? theme.colors.primary.normal : "transparent")};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary.normal : theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  cursor: pointer;
  text-align: left;
  transition: all 0.25s ease;
  box-shadow: ${({ selected }) => (selected ? "0 0 10px rgba(255, 75, 110, 0.3)" : "none")};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    transform: translateY(-3px);
  }
`;
const VoiceName = styled.div`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 4px;
`;

const VoiceDescription = styled.div<{selected: boolean}>`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ selected,theme }) => selected ? theme.colors.text.subtitle : theme.colors.common.white};
`;

