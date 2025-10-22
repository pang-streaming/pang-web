import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { updateStream, Category, UpdateStreamRequest } from '../../stream/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategorySelectModal } from './CategorySelectModal';
import { useCategorySelectModal } from '../hooks/useCategorySelectModal';
import { HashtagInput } from './HashtagInput';

interface StreamTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle?: string;
  selectedCategory?: Category | null;
  onCategoryChange?: (category: Category | null) => void;
  hashtags?: string[];
  onHashtagsChange?: (hashtags: string[]) => void;
  streamKey?: string;
  streamType?: "RTMP" | "WHIP";
  onSuccess?: () => void;
}

export const StreamTitleModal: React.FC<StreamTitleModalProps> = ({
  isOpen,
  onClose,
  currentTitle = '',
  selectedCategory,
  onCategoryChange,
  hashtags = [],
  onHashtagsChange,
  streamKey = '',
  streamType = 'WHIP',
  onSuccess
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [category, setCategory] = useState<Category | null>(selectedCategory || null);
  const [currentHashtags, setCurrentHashtags] = useState<string[]>(hashtags);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isClosing, setIsClosing] = useState(false);
  const queryClient = useQueryClient();
  const categorySelectModal = useCategorySelectModal();

  const updateStreamMutation = useMutation({
    mutationFn: ({ streamKey, updateData }: { streamKey: string; updateData: UpdateStreamRequest }) => 
      updateStream(streamKey, updateData),
    onMutate: async ({ updateData }) => {
      // 낙관적 업데이트: 서버 응답을 기다리지 않고 즉시 UI 업데이트
      await queryClient.cancelQueries({ queryKey: ['streamStatus'] });
      await queryClient.cancelQueries({ queryKey: ['streamInfo'] });
      
      const previousStreamStatus = queryClient.getQueryData(['streamStatus']);
      const previousStreamInfo = queryClient.getQueryData(['streamInfo']);
      
      // 스트림 상태 업데이트
      queryClient.setQueryData(['streamStatus'], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          title: updateData.title,
          categoryId: updateData.categoryId,
          tags: updateData.tags,
          streamType: updateData.streamType
        }
      }));
      
      return { previousStreamStatus, previousStreamInfo };
    },
    onSuccess: () => {
      setErrorMessage('');
      setSuccessMessage('스트리밍 정보가 성공적으로 업데이트되었습니다.');
      
      // 성공 메시지 표시 후 잠시 대기
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      }, 1500);
    },
    onError: (error: any, variables, context) => {
      console.error('스트리밍 정보 업데이트 실패:', error);
      setSuccessMessage('');
      
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousStreamStatus) {
        queryClient.setQueryData(['streamStatus'], context.previousStreamStatus);
      }
      if (context?.previousStreamInfo) {
        queryClient.setQueryData(['streamInfo'], context.previousStreamInfo);
      }
      
      // 에러 메시지 설정
      if (error?.response?.status === 400) {
        setErrorMessage('입력한 정보가 올바르지 않습니다. 다시 확인해주세요.');
      } else if (error?.response?.status === 401) {
        setErrorMessage('인증이 필요합니다. 다시 로그인해주세요.');
      } else if (error?.response?.status === 403) {
        setErrorMessage('권한이 없습니다. 스트림 키를 확인해주세요.');
      } else if (error?.response?.status === 404) {
        setErrorMessage('스트림을 찾을 수 없습니다.');
      } else {
        setErrorMessage('스트리밍 정보 업데이트에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
    onSettled: () => {
      // 성공/실패 관계없이 최신 데이터로 동기화
      queryClient.invalidateQueries({ queryKey: ['streamStatus'] });
      queryClient.invalidateQueries({ queryKey: ['streamInfo'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 에러 메시지 초기화
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!title.trim()) {
      setErrorMessage('방송 타이틀을 입력해주세요.');
      return;
    }
    
    if (!category) {
      setErrorMessage('카테고리를 선택해주세요.');
      return;
    }
    
    if (!streamKey) {
      setErrorMessage('스트림 키가 없습니다.');
      return;
    }

    const updateData: UpdateStreamRequest = {
      title: title.trim(),
      categoryId: category.id,
      tags: currentHashtags,
      streamType: streamType
    };

    updateStreamMutation.mutate({ streamKey, updateData });
    
    // 로컬 상태 업데이트
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    if (onHashtagsChange) {
      onHashtagsChange(currentHashtags);
    }
  };

  const handleCategorySelect = (selectedCategory: Category) => {
    setCategory(selectedCategory);
    if (onCategoryChange) {
      onCategoryChange(selectedCategory);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setTitle(currentTitle);
      setCategory(selectedCategory || null);
      setCurrentHashtags(hashtags);
      setErrorMessage('');
      setSuccessMessage('');
      setIsClosing(false);
      onClose();
    }, 300); // 애니메이션 시간과 맞춤
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose} $isClosing={isClosing}>
      <ModalContent onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        <ModalHeader>
          <ModalTitle>방송 설정</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="streamTitle">방송 타이틀</Label>
              <Input
                id="streamTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="방송 타이틀을 입력하세요"
                maxLength={100}
                autoFocus
              />
              <CharacterCount>{title.length}/100</CharacterCount>
            </FormGroup>

            <FormGroup>
              <Label>카테고리</Label>
              <CategorySelector>
                <CategoryDisplay onClick={categorySelectModal.openModal}>
                  {category ? (
                    <CategoryInfo>
                      {category.postImage && (
                        <CategoryImage src={category.postImage} alt={category.name} />
                      )}
                      <CategoryName>{category.name}</CategoryName>
                    </CategoryInfo>
                  ) : (
                    <CategoryPlaceholder>카테고리를 선택하세요</CategoryPlaceholder>
                  )}
                  <DropdownIcon>▼</DropdownIcon>
                </CategoryDisplay>
              </CategorySelector>
            </FormGroup>

            <FormGroup>
              <Label>해시태그</Label>
              <HashtagInput
                initialHashtags={currentHashtags}
                onHashtagsChange={setCurrentHashtags}
                placeholder="해시태그를 입력하고 엔터를 누르세요"
                maxTags={3}
                maxTagLength={20}
              />
            </FormGroup>

            {/* 에러 메시지 */}
            {errorMessage && (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            )}

            {/* 성공 메시지 */}
            {successMessage && (
              <SuccessMessage>{successMessage}</SuccessMessage>
            )}
            
            <ButtonGroup>
              <CancelButton type="button" onClick={handleClose}>
                취소
              </CancelButton>
              <SaveButton 
                type="submit" 
                disabled={!title.trim() || !category || updateStreamMutation.isPending}
              >
                {updateStreamMutation.isPending ? '저장 중...' : '저장'}
              </SaveButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContent>

      <CategorySelectModal
        isOpen={categorySelectModal.isOpen}
        onClose={categorySelectModal.closeModal}
        onSelectCategory={handleCategorySelect}
        selectedCategory={category}
      />
    </ModalOverlay>
  );
};

// 애니메이션 keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
`;

const ModalOverlay = styled.div<{ $isClosing?: boolean }>`
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
  animation: ${({ $isClosing }) => $isClosing ? fadeOut : fadeIn} 0.3s ease-out;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div<{ $isClosing?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: ${({ $isClosing }) => $isClosing ? slideOut : slideIn} 0.3s ease-out;
  transform-origin: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 8px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.normal};
  background-color: ${({ theme }) => theme.colors.background.light};
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }
`;

const CharacterCount = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: right;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 8px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

const SaveButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.text.subtitle};
    cursor: not-allowed;
  }
`;

const CategorySelector = styled.div`
  position: relative;
  width: 100%;
`;

const CategoryDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background.light};
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
`;

const CategoryName = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const CategoryPlaceholder = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
//   font-style: italic;
`;

const DropdownIcon = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
  transition: transform 0.2s;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 8px;
`;

const SuccessMessage = styled.div`
  padding: 12px 16px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  color: #16a34a;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 8px;
`;
