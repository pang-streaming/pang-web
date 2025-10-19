import React, { useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const dummySuggestions = [
  "LOL",
  "Minecraft",
  "Fortnite",
  "Among Us",
  "Valorant",
  "Overwatch",
  "Minecraft Server",
  "K-Drama",
  "Music Live",
  "Cooking Stream",
];

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (word: string) => {
    setQuery(word);
    setIsFocused(false);
    setFocusedIndex(null);
  };

  return (
    <SearchBarWrapper>
      <SearchBarContainer>
        <SearchBarContent
          id="search-input"
          type="text"
          placeholder="보고싶은 방송을 찾아보세요!"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          isFocused={isFocused}
        />
        <SearchBarLabel htmlFor="search-input">
          <SearchBarIcon size={26} />
        </SearchBarLabel>
      </SearchBarContainer>

      {isFocused && (
        <SuggestionsContainer>
          {dummySuggestions.map((word, idx) => (
            <SuggestionItem
              key={word}
              isFocused={focusedIndex === idx}
              onMouseEnter={() => setFocusedIndex(idx)}
              onMouseLeave={() => setFocusedIndex(null)}
              onMouseDown={() => handleSelect(word)}
            >
              <SuggestionIcon />
              {word}
            </SuggestionItem>
          ))}
        </SuggestionsContainer>
      )}
    </SearchBarWrapper>
  );
};

/* Styled Components */
const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 615px;
  gap: 0px;
  position: relative;
`;

const SearchBarIcon = styled(IoIosSearch)`
  color: ${({ theme }) => theme.colors.primary.normal};
`;

const SearchBarLabel = styled.label`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchBarContent = styled.input<{ isFocused?: boolean }>`
  width: 100%;
  height: 40px;
  padding-left: 16px;
  padding-right: 40px;
  font-size: 14px;
  border: none;
  border-radius: ${({ theme, isFocused }) =>
    isFocused ? `20px 20px 0 0` : theme.borders.maximum};
  background-color: ${({ theme }) => theme.colors.content.normal};
  color: ${({ theme }) => theme.colors.text.normal};
  box-shadow: ${({ isFocused }) => (isFocused ? "0 4px 12px rgba(0,0,0,0.15)" : "none")};

  &:focus {
    outline: none;
  }

  user-select: none;
`;

const SuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0 0 20px 20px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 10;
  padding-bottom: 5px;
`;

const SuggestionItem = styled.div<{ isFocused?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.hover.light : "transparent"};
  color: ${({ theme }) => theme.colors.text.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.light};
  }
`;

const SuggestionIcon = styled(IoIosSearch)`
  color: #888888;
  font-size: 16px;
`;