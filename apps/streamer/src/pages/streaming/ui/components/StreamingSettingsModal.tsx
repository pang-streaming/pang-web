import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateStream } from '@/features/stream/api';
import * as S from '../styles';

interface StreamingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStreamType: 'RTMP' | 'WHIP';
  streamKey: string;
  queryClient: any;
  streamStatus: any;
}

export const StreamingSettingsModal: React.FC<StreamingSettingsModalProps> = ({
  isOpen,
  onClose,
  currentStreamType,
  streamKey,
  queryClient,
  streamStatus
}) => {
  const [selectedType, setSelectedType] = useState<'RTMP' | 'WHIP'>(currentStreamType);
  const [isClosing, setIsClosing] = useState(false);

  // currentStreamType이 변경되면 selectedType도 업데이트
  useEffect(() => {
    setSelectedType(currentStreamType);
  }, [currentStreamType]);

  // 스트림 타입 변경 mutation
  const updateStreamTypeMutation = useMutation({
    mutationFn: (streamType: 'RTMP' | 'WHIP') => updateStream(streamKey, { 
      title: streamStatus?.data?.title || '', // 기존 제목 유지
      categoryId: streamStatus?.data?.categoryId || 0, // 기존 카테고리 유지
      tags: streamStatus?.data?.tags || [], // 기존 태그 유지
      streamType: streamType 
    }),
    onMutate: async (newStreamType) => {
      // 낙관적 업데이트: 서버 응답을 기다리지 않고 즉시 UI 업데이트
      await queryClient.cancelQueries({ queryKey: ['streamStatus'] });
      
      const previousStreamStatus = queryClient.getQueryData(['streamStatus']);
      
      queryClient.setQueryData(['streamStatus'], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          streamType: newStreamType
        }
      }));
      
      return { previousStreamStatus };
    },
    onError: (err, newStreamType, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousStreamStatus) {
        queryClient.setQueryData(['streamStatus'], context.previousStreamStatus);
      }
      console.error('스트림 타입 변경 실패:', err);
    },
    onSettled: () => {
      // 성공/실패 관계없이 최신 데이터로 동기화
      queryClient.invalidateQueries({ queryKey: ['streamStatus'] });
    },
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleTypeChange = (type: 'RTMP' | 'WHIP') => {
    setSelectedType(type);
    console.log(`방송 방식이 ${type === 'RTMP' ? '외부 송출 프로그램' : '팡 스트리머'}로 변경되었습니다.`);
  };

  const handleSave = () => {
    console.log(`방송 설정 저장: ${selectedType}`);
    
    // mutation 실행 (낙관적 업데이트 포함)
    updateStreamTypeMutation.mutate(selectedType, {
      onSuccess: () => {
        console.log('스트림 타입 변경 성공');
        handleClose();
      },
      onError: (error) => {
        console.error('스트림 타입 변경 실패:', error);
        alert('스트림 타입 변경에 실패했습니다.');
      }
    });
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={handleClose} $isClosing={isClosing}>
      <S.ModalContent onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        <S.ModalHeader>
          <S.ModalTitle>방송 설정</S.ModalTitle>
          <S.CloseButton onClick={handleClose}>×</S.CloseButton>
        </S.ModalHeader>
        
        <S.ModalBody>
          <S.Form as="div">
            <S.FormGroup>
              <S.Label>방송 방식 선택</S.Label>
              <S.OptionContainer>
                <S.OptionButton
                  type="button"
                  $isSelected={selectedType === 'RTMP'}
                  onClick={() => handleTypeChange('RTMP')}
                >
                  <S.OptionIcon>📺</S.OptionIcon>
                  <S.OptionContent>
                    <S.OptionTitle>외부 송출 프로그램</S.OptionTitle>
                    <S.OptionDescription>OBS, XSplit 등 외부 프로그램 사용</S.OptionDescription>
                  </S.OptionContent>
                </S.OptionButton>

                <S.OptionButton
                  type="button"
                  $isSelected={selectedType === 'WHIP'}
                  onClick={() => handleTypeChange('WHIP')}
                >
                  <S.OptionIcon>🎮</S.OptionIcon>
                  <S.OptionContent>
                    <S.OptionTitle>팡 스트리머</S.OptionTitle>
                    <S.OptionDescription>팡 플랫폼 내장 스트리머 사용</S.OptionDescription>
                  </S.OptionContent>
                </S.OptionButton>
              </S.OptionContainer>
            </S.FormGroup>

            {selectedType === 'RTMP' && (
              <S.FormGroup>
                <S.Label>RTMP 설정 정보</S.Label>
                <S.InfoContainer>
                  <S.InfoItem>
                    <S.StreamingInfoLabel>서버 주소:</S.StreamingInfoLabel>
                    <S.StreamingInfoValue>
                      rtmp://{import.meta.env.VITE_RTMP_SERVER_URL || 'stream.pang.com'}:{import.meta.env.VITE_RTMP_SERVER_PORT || '1935'}
                    </S.StreamingInfoValue>
                    <S.CopyButton onClick={() => navigator.clipboard.writeText(
                      `rtmp://${import.meta.env.VITE_RTMP_SERVER_URL || 'stream.pang.com'}:${import.meta.env.VITE_RTMP_SERVER_PORT || '1935'}`
                    )}>
                      복사
                    </S.CopyButton>
                  </S.InfoItem>
                  <S.InfoItem>
                    <S.StreamingInfoLabel>스트림 키:</S.StreamingInfoLabel>
                    <S.StreamingInfoValue>{streamKey}</S.StreamingInfoValue>
                    <S.CopyButton onClick={() => navigator.clipboard.writeText(streamKey)}>
                      복사
                    </S.CopyButton>
                  </S.InfoItem>
                </S.InfoContainer>
              </S.FormGroup>
            )}

            {selectedType === 'WHIP' && (
              <S.FormGroup>
                <S.Label>팡 스트리머</S.Label>
                <S.InfoContainer>
                  <S.InfoText>
                    팡 스트리머를 사용하면 별도의 설정 없이 바로 방송을 시작할 수 있습니다.
                    브라우저에서 직접 스트리밍이 가능합니다.
                  </S.InfoText>
                </S.InfoContainer>
              </S.FormGroup>
            )}
            
            <S.ButtonGroup>
              <S.CancelButton type="button" onClick={handleClose}>
                취소
              </S.CancelButton>
              <S.SaveButton 
                type="button" 
                onClick={handleSave}
                disabled={updateStreamTypeMutation.isPending}
              >
                {updateStreamTypeMutation.isPending ? '저장 중...' : '저장'}
              </S.SaveButton>
            </S.ButtonGroup>
          </S.Form>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
