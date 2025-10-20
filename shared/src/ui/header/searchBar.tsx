
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { SearchStream } from "./type";
import { Pageable, searchStream } from "./api";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchStream[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null); // 🔥 추가

  const pageable: Pageable = {
    page: 0,
    size: 5,
    sort: ["createdAt,desc"],
  };

  const handleSearch = async () => {
    if (query.trim().length < 2) return;

    try {
      setIsLoading(true);
      const results = await searchStream(query, pageable);
      console.log("검색 성공:", results);
      setSuggestions(results);
      setIsFocused(true);

      if (results.length === 0) {
        console.warn("검색 결과 없음");
      }
    } catch (err) {
      console.error("검색 실패:", err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSelect = (stream: SearchStream) => {
    setQuery(stream.title);
    setIsFocused(false);
    setFocusedIndex(null);
    console.log("선택된 방송:", stream);
  };

  // 🔥 영역 밖 클릭 시 포커스 해제
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SearchBarWrapper ref={wrapperRef}>
      <SearchBarContainer>
        <SearchBarContent
          id="search-input"
          type="text"
          placeholder="보고싶은 방송을 찾아보세요!"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          isFocused={isFocused}
        />
        <SearchBarLabel onClick={handleSearch}>
          <SearchBarIcon size={26} />
        </SearchBarLabel>
      </SearchBarContainer>

      {isFocused && (
        <SuggestionsContainer>
          {isLoading ? (
            <LoadingItem>검색 중...</LoadingItem>
          ) : suggestions.length > 0 ? (
            suggestions.map((stream, idx) => (
              <SuggestionItem
                key={stream.id}
                isFocused={focusedIndex === idx}
                onMouseEnter={() => setFocusedIndex(idx)}
                onMouseLeave={() => setFocusedIndex(null)}
                onMouseDown={() => handleSelect(stream)}
              >
                <SuggestionIcon />
                <StreamInfo>
                  <StreamTitle>{stream.title}</StreamTitle>
                  <StreamMeta>
                    {stream.streamerName} • {stream.viewerCount}명 시청 중
                  </StreamMeta>
                </StreamInfo>
              </SuggestionItem>
            ))
          ) : (
            <EmptyItem>검색 결과가 없습니다</EmptyItem>
          )}
        </SuggestionsContainer>
      )}
    </SearchBarWrapper>
  );
};

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
  box-shadow: ${({ isFocused }) =>
    isFocused ? "0 4px 12px rgba(0,0,0,0.15)" : "none"};

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
  flex-shrink: 0;
`;

const StreamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const StreamTitle = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const StreamMeta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const LoadingItem = styled.div`
  padding: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const EmptyItem = styled.div`
  padding: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
