import React from "react";
import styled from "styled-components";
import { SourceType } from "../hooks/useAddSourceModal";
import { ScreenShareOption } from "./ScreenShareOption";
import { ImageOption } from "./ImageOption";
import { VTuberOption } from "@/features/modal/components/VtuberOption";
import { ThreeDBackgroundOption } from "./3DBackgroundModal";
import {
  Screen,
  CanvasSize,
} from "@/features/canvas/constants/canvas-constants";

interface AddSourceModalProps {
  isOpen: boolean;
  selectedType: SourceType;
  onClose: () => void;
  onSelectType: (type: SourceType) => void;
  onGoBack: () => void;
  canvasSize: CanvasSize;
  onAddScreen: (screen: Screen) => void;
  onAddVTuber: (vrmUrl: string | null, selectedDevice: MediaDeviceInfo, sourceName: string) => void;
}

export const AddSourceModal = ({
  isOpen,
  selectedType,
  onClose,
  onSelectType,
  onGoBack,
  canvasSize,
  onAddScreen,
  onAddVTuber,
}: AddSourceModalProps) => {
  const [sourceName, setSourceName] = React.useState("");
  const mouseDownTarget = React.useRef<EventTarget | null>(null);

  const handleOverlayMouseDown = (e: React.MouseEvent) => {
    mouseDownTarget.current = e.target;
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // mousedown과 click이 모두 overlay에서 발생했을 때만 닫기
    if (e.target === e.currentTarget && mouseDownTarget.current === e.currentTarget) {
      onClose();
    }
    mouseDownTarget.current = null;
  };

  if (!isOpen) return null;

  if (!selectedType) {
    return (
      <ModalOverlay onMouseDown={handleOverlayMouseDown} onClick={handleOverlayClick}>
        <ModalContent>
          <ModalHeader>
            <h2>화면 소스</h2>
            <CloseButton onClick={onClose}>✕</CloseButton>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <SourceNameInput
              type="text"
              placeholder="소스 이름"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
            />

            <TagSection>
              <TagGroup>
                <SourceTag
                  onClick={() => onSelectType("screen")}
                  $isActive={false}
                >
                  화면 캡처
                </SourceTag>
                <SourceTag
                  onClick={() => onSelectType("image")}
                  $isActive={false}
                >
                  이미지
                </SourceTag>
                <SourceTag
                  onClick={() => onSelectType("vtuber")}
                  $isActive={false}
                >
                  VTuber
                </SourceTag>
                <SourceTag
                  onClick={() => onSelectType("3d-background")}
                  $isActive={false}
                >
                  3D 배경
                </SourceTag>
              </TagGroup>
            </TagSection>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onMouseDown={handleOverlayMouseDown} onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <h2>화면 소스</h2>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <SourceNameInput
            type="text"
            placeholder="소스 이름"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
          />

          <TagSection>
            <TagGroup>
              <SourceTag
                onClick={() => onSelectType("screen")}
                $isActive={selectedType === "screen"}
              >
                화면 캡처
              </SourceTag>
              <SourceTag
                onClick={() => onSelectType("image")}
                $isActive={selectedType === "image"}
              >
                이미지
              </SourceTag>
              <SourceTag
                onClick={() => onSelectType("vtuber")}
                $isActive={selectedType === "vtuber"}
              >
                VTuber
              </SourceTag>
              <SourceTag
                onClick={() => onSelectType("3d-background")}
                $isActive={selectedType === "3d-background"}
              >
                3D 배경
              </SourceTag>
            </TagGroup>
          </TagSection>

          <ContentArea>
            {selectedType === "screen" && (
              <ScreenShareOption
                canvasSize={canvasSize}
                onAddScreen={onAddScreen}
                onClose={onClose}
                sourceName={sourceName}
              />
            )}
            {selectedType === "image" && (
              <ImageOption
                canvasSize={canvasSize}
                onAddScreen={onAddScreen}
                onClose={onClose}
                sourceName={sourceName}
              />
            )}
            {selectedType === "vtuber" && (
              <VTuberOption
                onAddVTuber={onAddVTuber}
                onClose={onClose}
                sourceName={sourceName}
              />
            )}
            {selectedType === "3d-background" && (
              <ThreeDBackgroundOption
                canvasSize={canvasSize}
                onAddScreen={onAddScreen}
                onClose={onClose}
                sourceName={sourceName}
              />
            )}
          </ContentArea>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => `${theme.colors.background.dark}CC`};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: 20px;
  width: 90%;
  max-width: 730px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 23px 24px;
  position: relative;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.text.normal};
    text-align: center;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  position: absolute;
  right: 24px;
  line-height: 1;

  &:hover {
    opacity: 0.7;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.content.dark};
`;

const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SourceNameInput = styled.input`
  width: 100%;
  padding: 12px 17px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.content.normal};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 15px;
  font-family: "Wanted Sans", sans-serif;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.content.dark};
  }
`;

const TagSection = styled.div`
  display: flex;
  align-items: center;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SourceTag = styled.button<{ $isActive: boolean }>`
  padding: 6px 12px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.content.dark : theme.colors.content.normal};
  border: none;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 14px;
  font-family: "Wanted Sans", sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.content.dark};
  }
`;

const ContentArea = styled.div`
  margin-top: 4px;
`;
