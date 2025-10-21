import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { VideoList } from "@/shared/ui/video/video-list";
import { SkeletonGrid } from "@/shared/ui/skeleton";
import { searchStream, Pageable, SearchStream } from "@pang/shared/ui";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchStream[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageable: Pageable = {
    page: 0,
    size: 20,
    sort: ["createdAt,desc"],
  };

  useEffect(() => {
    console.log("🔎 Search 페이지 - 쿼리:", query);
    
    if (!query || query.trim().length < 2) {
      console.log("⚠️ 검색어 없음 또는 너무 짧음");
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        console.log("📡 검색 API 호출 시작:", query);
        setIsLoading(true);
        setError(null);
        const data = await searchStream(query, pageable);
        console.log("✅ 검색 API 성공, 결과 개수:", data.length);
        console.log("📦 검색 결과 데이터:", data);
        setResults(data);
      } catch (err) {
        console.error("❌ 검색 실패:", err);
        setError("검색 중 오류가 발생했습니다");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // SearchStream을 VideoList가 기대하는 형식으로 변환
  const videos = results.map((stream) => ({
    streamId: stream.id,
    title: stream.title,
    url: stream.thumbnail,
    userId: stream.streamerName,
    username: stream.streamerName,
    nickname: stream.streamerName,
    profileImage: stream.thumbnail,
    followers: stream.viewerCount,
    viewCount: stream.viewerCount,
    thumbnail: stream.thumbnail, 
  }));

  return (
    <SearchContainer>
      <TabTitleText>
        {query ? `"${query}" 검색 결과` : "검색"}
      </TabTitleText>

      {isLoading ? (
        <SkeletonGrid count={6} minWidth={420} itemHeight={240} />
      ) : error ? (
        <EmptyState>
          <EmptyStateTitle>😢 {error}</EmptyStateTitle>
          <EmptyStateMessage>다시 시도해주세요</EmptyStateMessage>
        </EmptyState>
      ) : !query || query.trim().length < 2 ? (
        <EmptyState>
          <EmptyStateTitle>🔍 검색어를 입력해주세요</EmptyStateTitle>
          <EmptyStateMessage>
            최소 2글자 이상 입력해주세요
          </EmptyStateMessage>
        </EmptyState>
      ) : results.length === 0 ? (
        <EmptyState>
          <EmptyStateTitle>검색 결과가 없습니다</EmptyStateTitle>
          <EmptyStateMessage>
            다른 검색어를 입력해보세요
          </EmptyStateMessage>
        </EmptyState>
      ) : (
        <VideoList videos={videos} />
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 12px;
`;

const EmptyStateTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const EmptyStateMessage = styled.p`
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text.subtitle};
  margin: 0;
`;
