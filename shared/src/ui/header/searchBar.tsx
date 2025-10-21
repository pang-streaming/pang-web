import React, { useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("검색 시도:", query);
    if (query.trim().length < 2) {
      console.log("검색어가 너무 짧음");
      return;
    }
    const searchUrl = `/search?q=${encodeURIComponent(query.trim())}`;
    navigate(searchUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
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
          onKeyDown={handleKeyDown}
        />
        <SearchBarLabel onClick={handleSearch}>
          <SearchBarIcon size={26} />
        </SearchBarLabel>
      </SearchBarContainer>
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

const SearchBarContent = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 16px;
  padding-right: 40px;
  font-size: 14px;
  border: none;
  border-radius: ${({ theme }) => theme.borders.maximum};
  background-color: ${({ theme }) => theme.colors.content.normal};
  color: ${({ theme }) => theme.colors.text.normal};

  &:focus {
    outline: none;
  }

  user-select: none;
`;
