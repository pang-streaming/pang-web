import React, { useState } from 'react';
import * as S from '../styles';

interface AddRtmpServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (rtmpUrl: string) => void;
}

export const AddRtmpServerModal: React.FC<AddRtmpServerModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [serverUrl, setServerUrl] = useState('');
  const [streamKey, setStreamKey] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setServerUrl('');
      setStreamKey('');
      onClose();
    }, 300);
  };

  const handleAdd = () => {
    if (!serverUrl.trim() || !streamKey.trim()) {
      alert('서버 주소와 스트림 키를 모두 입력해주세요.');
      return;
    }

    // RTMP URL 형식으로 조합
    const rtmpUrl = `${serverUrl}/${streamKey}`;
    onAdd(rtmpUrl);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={handleClose} $isClosing={isClosing}>
      <S.ModalContent
        onClick={(e) => e.stopPropagation()}
        $isClosing={isClosing}
        style={{ maxWidth: '450px' }}
      >
        <S.ModalHeader>
          <S.ModalTitle>RTMP 서버 추가</S.ModalTitle>
          <S.CloseButton onClick={handleClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <S.Form as="div">
            <S.FormGroup>
              <S.Label>서버 주소</S.Label>
              <S.Input
                type="text"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                placeholder="rtmp://서버주소:포트/앱"
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>스트림 키</S.Label>
              <S.Input
                type="text"
                value={streamKey}
                onChange={(e) => setStreamKey(e.target.value)}
                placeholder="스트림 키 입력"
              />
            </S.FormGroup>

            <S.ButtonGroup>
              <S.CancelButton type="button" onClick={handleClose}>
                취소
              </S.CancelButton>
              <S.SaveButton
                type="button"
                onClick={handleAdd}
              >
                추가
              </S.SaveButton>
            </S.ButtonGroup>
          </S.Form>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
