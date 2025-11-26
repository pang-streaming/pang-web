import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, Category } from '../../stream/api';

interface CategorySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: Category) => void;
  selectedCategory?: Category | null;
}

export const CategorySelectModal: React.FC<CategorySelectModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  selectedCategory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const { data: categoriesData, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    enabled: isOpen,
    staleTime: 1000 * 60 * 5, // 5분간 캐시
  });

  const categories = categoriesData?.data || [];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategorySelect = (category: Category) => {
    onSelectCategory(category);
    onClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSearchTerm('');
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose} $isClosing={isClosing}>
      <ModalContent onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        <ModalHeader>
          <ModalTitle>카테고리 선택</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="카테고리 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          {isLoading && (
            <LoadingContainer>
              <LoadingText>카테고리를 불러오는 중...</LoadingText>
            </LoadingContainer>
          )}

          {error && (
            <ErrorContainer>
              <ErrorText>카테고리를 불러올 수 없습니다.</ErrorText>
            </ErrorContainer>
          )}

          {!isLoading && !error && (
            <CategoriesGrid data-count={filteredCategories.length}>
              {filteredCategories.length === 0 ? (
                <NoResultsText>검색 결과가 없습니다.</NoResultsText>
              ) : (
                filteredCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    $isSelected={selectedCategory?.id === category.id}
                  >
                    <CategoryThumbnailWrapper $isSelected={selectedCategory?.id === category.id}>
                      {category.postImage ? (
                        <CategoryImage src={category.postImage} alt={category.name} title={category.name} />
                      ) : (
                        <CategoryImage 
                          src="/dummy-images/thumbnail-1.png" 
                          alt={category.name}
                          title={category.name}
                        />
                      )}
                      <Tooltip>{category.name}</Tooltip>
                    </CategoryThumbnailWrapper>
                    <CategoryInfo>
                      <CategoryName $isSelected={selectedCategory?.id === category.id}>
                        {category.name}
                      </CategoryName>
                      {category.description && (
                        <CategoryDescription>{category.description}</CategoryDescription>
                      )}
                    </CategoryInfo>
                  </CategoryCard>
                ))
              )}
            </CategoriesGrid>
          )}

          <ButtonGroup>
            <CancelButton onClick={handleClose}>
              취소
            </CancelButton>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
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
  z-index: 1001;
  animation: ${({ $isClosing }) => $isClosing ? fadeOut : fadeIn} 0.3s ease-out;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div<{ $isClosing?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 16px;
  width: 95%;
  max-width: 1200px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
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
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const SearchContainer = styled.div`
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  width: calc(100% - 42px);
  padding-left: 16px;
  padding-right: 16px;
  height: 40px;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const LoadingText = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const ErrorText = styled.div`
  font-size: 1rem;
  color: #ef4444;
`;

const CategoriesGrid = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  max-width: 100%;
  margin-bottom: 24px;
  overflow-x: hidden;
  
  /* 검색 결과가 적을 때 최대 너비 제한 */
  &[data-count="1"] {
    grid-template-columns: 200px;
    justify-content: start;
  }
  
  &[data-count="2"] {
    grid-template-columns: repeat(2, 1fr);
    max-width: 500px;
    margin: 0 0 24px 0;
  }
  
  &[data-count="3"] {
    grid-template-columns: repeat(3, 1fr);
    max-width: 700px;
    margin: 0 0 24px 0;
  }
`;

const CategoryCard = styled.div<{ $isSelected?: boolean }>`
  aspect-ratio: 41/67;
  border-radius: ${({ theme }) => theme.borders.xlarge};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 3px solid transparent;
  transition: 0.3s scale;
  cursor: pointer;
  max-width: 250px;
  width: 100%;

  &:hover {
    scale: 0.97;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
  
  /* 말풍선 화살표 */
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid rgba(0, 0, 0, 0.8);
  }
`;

const CategoryThumbnailWrapper = styled.div<{ $isSelected?: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 41 / 56;
  overflow: visible;
  border: 3px solid transparent;
  margin-bottom: 10px;
  transition: 0.3s border-color;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryName = styled.div<{ $isSelected?: boolean }>`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 700;
  color: ${({ $isSelected, theme }) => 
    $isSelected ? theme.colors.primary.normal : theme.colors.text.normal};
  transition: color 0.3s;
`;

const CategoryDescription = styled.div`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const NoResultsText = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
  grid-column: 1 / -1;
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
