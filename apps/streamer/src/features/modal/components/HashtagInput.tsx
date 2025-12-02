import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface HashtagInputProps {
  initialHashtags?: string[];
  onHashtagsChange: (hashtags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  maxTagLength?: number;
}

export const HashtagInput: React.FC<HashtagInputProps> = ({
  initialHashtags = [],
  onHashtagsChange,
  placeholder = "해시태그를 입력하세요...",
  maxTags = 3,
  maxTagLength = 20
}) => {
  const [tags, setTags] = useState<string[]>(initialHashtags);
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addHashtag();
    }
  };

  const addHashtag = () => {
    const tag = inputValue.trim().replace(/^#/, ''); // # 제거
    
    if (tag && !tags.includes(tag) && tags.length < maxTags && tag.length <= maxTagLength) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      onHashtagsChange(updatedTags);
      setInputValue('');
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    onHashtagsChange(updatedTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // # 문자는 자동으로 제거
    setInputValue(value.replace(/#/g, ''));
  };

  return (
    <HashtagContainer>
      <HashtagInputWrapper>
        <HashtagList>
          {tags.map((tag, index) => (
            <HashtagItem key={index}>
              <HashtagText>#{tag}</HashtagText>
              <RemoveButton onClick={() => removeHashtag(tag)}>×</RemoveButton>
            </HashtagItem>
          ))}
        </HashtagList>
        
        {tags.length < maxTags && (
          <HashtagInputField
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={tags.length === 0 ? placeholder : ''}
            maxLength={maxTagLength}
          />
        )}
      </HashtagInputWrapper>
      
      {tags.length >= maxTags && (
        <MaxTagsMessage>최대 {maxTags}개까지 추가할 수 있습니다.</MaxTagsMessage>
      )}
    </HashtagContainer>
  );
};

const HashtagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const HashtagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 0px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background.light};
  height: 48px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const HashtagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`;

const HashtagItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px 6px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  border-radius: 10px;
  font-size: 0.75rem;
  transition: all 0.2s;
  white-space: nowrap;
  height: 20px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const HashtagText = styled.span`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.inverse};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0;
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  margin-left: 3px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.light};
  }
`;

const HashtagInputField = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.normal};
  background: transparent;
  flex: 1;
  min-width: 120px;
  padding: 0;
  height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }
`;

const MaxTagsMessage = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
  padding: 8px;
`;
