import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { CanvasSize } from "@/features/canvas/constants/canvas-constants";

interface VTuberOptionProps {
  onAddVTuber: (vrmUrl: string | null, selectedDevice: MediaDeviceInfo, sourceName: string) => void;
  onClose: () => void;
  sourceName: string;
}

export const VTuberOption = ({ onAddVTuber, onClose, sourceName }: VTuberOptionProps) => {
  const [vrmFile, setVrmFile] = useState<File | null>(null);
  const [vrmUrl, setVrmUrl] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        const availableDevices =
          await navigator.mediaDevices.enumerateDevices();
        const videoDevices = availableDevices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0 && !selectedDevice) {
          setSelectedDevice(videoDevices[0]);
        }
      } catch (err) {
        console.error("카메라 접근 오류:", err);
        alert("카메라 권한이 필요합니다.");
      }
    };
    getDevices();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith(".vrm")) {
        alert(".vrm 파일만 선택 가능합니다.");
        return;
      }
      setVrmFile(file);
      const url = URL.createObjectURL(file);
      setVrmUrl(url);
    }
  };

  const handleClearFile = () => {
    if (vrmUrl) {
      URL.revokeObjectURL(vrmUrl);
    }
    setVrmFile(null);
    setVrmUrl(null);
  };

  const handleConfirm = () => {
    if (!selectedDevice) {
      alert("카메라를 선택해주세요.");
      return;
    }

    onAddVTuber(vrmUrl, selectedDevice, sourceName);
    onClose();
  };

  return (
    <OptionContainer>
      <Description>
        VTuber 아바타를 추가합니다. VRM 파일을 선택하지 않으면 기본 아바타가
        사용됩니다.
      </Description>

      <Section>
        <SectionLabel>VRM 파일 (선택사항)</SectionLabel>
        <FileInputWrapper>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept=".vrm"
            onChange={handleFileSelect}
          />
          <SelectFileButton onClick={() => fileInputRef.current?.click()}>
            📁 VRM 파일 선택
          </SelectFileButton>
          {vrmFile && (
            <FileInfo>
              <FileName>{vrmFile.name}</FileName>
              <ClearButton onClick={handleClearFile}>✕</ClearButton>
            </FileInfo>
          )}
          {!vrmFile && (
            <HelperText>선택하지 않으면 기본 아바타 사용</HelperText>
          )}
        </FileInputWrapper>
      </Section>

      <Section>
        <SectionLabel>카메라 선택 (필수)</SectionLabel>
        <Select
          value={selectedDevice?.deviceId || ""}
          onChange={(e) => {
            const device = devices.find((d) => d.deviceId === e.target.value);
            setSelectedDevice(device || null);
          }}
        >
          {devices.length === 0 && <option>카메라를 찾을 수 없습니다</option>}
          {devices.map((device, index) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${index + 1}`}
            </option>
          ))}
        </Select>
      </Section>

      <ButtonGroup>
        <CancelButton onClick={onClose}>취소</CancelButton>
        <ConfirmButton onClick={handleConfirm} disabled={!selectedDevice}>
          확인
        </ConfirmButton>
      </ButtonGroup>
    </OptionContainer>
  );
};

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 0.95rem;
  margin: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionLabel = styled.label`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1rem;
  font-weight: 600;
`;

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SelectFileButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};
  border: 2px dashed ${({ theme }) => theme.colors.border.normal};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
    border-color: ${({ theme }) => theme.colors.text.normal};
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: 6px;
`;

const FileName = styled.div`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 0.9rem;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.subtitle};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
    color: ${({ theme }) => theme.colors.text.normal};
  }
`;

const HelperText = styled.div`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 0.85rem;
  font-style: italic;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverse};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
