import styled from "styled-components";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { VideoList } from "@/shared/ui/video/video-list";
import { SkeletonGrid } from "@/shared/ui/skeleton";
import { searchAll, type Stream, type SearchUser, type Product } from "@pang/shared/ui";
import { FollowingCard } from "@/features/follow/ui/following-card";
import { VirtualModelElem } from "../market/widget/market-section/widget/virtual-model-section/components/virtual-model-elem";
import { formattedPrice } from "../market/util/formatted-price";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [streams, setStreams] = useState<Stream[]>([]);
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Search 페이지 - 쿼리:", query);
    
    if (!query || query.trim().length < 2) {
      console.log("검색어 없음 또는 너무 짧음");
      setStreams([]);
      setUsers([]);
      setProducts([]);
      return;
    }
    // https://pang-api.euns.dev/search/%EC%83%81%EC%9D%80
    // https://pang-api.euns.dev/search%EC%83%81%EC%9D%80 

    const fetchResults = async () => {
      try {
        console.log("통합 검색 API 호출 시작:", query);
        setIsLoading(true);
        setError(null);
        const data = await searchAll(query);
        console.log("통합 검색 결과:", data);
        setStreams(data.data.streams || []);
        setUsers(data.data.users || []);
        setProducts(data.data.products || []);
      } catch (err) {
        console.error("검색 실패:", err);
        setError("검색 중 오류가 발생했습니다");
        setStreams([]);
        setUsers([]);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const videos = streams.map((stream) => ({
    streamId: stream.streamId,
    title: stream.title,
    url: stream.url,
    userId: stream.username,
    username: stream.username,
    nickname: stream.nickname,
    profileImage: stream.profileImage,
    followers: stream.viewCount,
    viewCount: stream.viewCount,
    thumbnail: stream.thumbnail,
  }));

  const totalResults = streams.length + users.length + products.length;

  return (
    <SearchContainer>
      <TabTitleText>
        {query ? `"${query}" 검색 결과` : "검색"}
      </TabTitleText>

      {isLoading ? (
        <>
          <SectionTitle>라이브</SectionTitle>
          <SkeletonGrid count={3} minWidth={420} itemHeight={240} />
          
          <SectionTitle>사용자</SectionTitle>
          <SkeletonGrid count={4} minWidth={168} itemHeight={100} />
          
          <SectionTitle>상품</SectionTitle>
          <SkeletonGrid count={4} minWidth={168} itemHeight={224} />
        </>
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
      ) : totalResults === 0 ? (
        <EmptyState>
          <EmptyStateTitle>검색 결과가 없습니다</EmptyStateTitle>
          <EmptyStateMessage>
            다른 검색어를 입력해보세요
          </EmptyStateMessage>
        </EmptyState>
      ) : (
        <>
          {/* 라이브 스트림 */}
          {streams.length > 0 && (
            <Section>
              <SectionTitle>라이브 ({streams.length})</SectionTitle>
              <VideoList videos={videos} />
            </Section>
          )}

          {/* 사용자 */}
          {users.length > 0 && (
            <Section>
              <SectionTitle>사용자 ({users.length})</SectionTitle>
              <UserGrid>
                {users.map((user) => (
                  <div key={user.id} onClick={() => navigate(`/profile/${user.username}`)}>
                    <FollowingCard
                      profileImage={user.profileImage}
                      streamerName={user.nickname}
                      followerCount={formattedPrice(user.follower)}
                    />
                  </div>
                ))}
              </UserGrid>
            </Section>
          )}

          {/* 상품 */}
          {products.length > 0 && (
            <Section>
              <SectionTitle>상품 ({products.length})</SectionTitle>
              <ProductGrid>
                {products.map((product) => (
                  <VirtualModelElem
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    productName={product.name}
                    price={product.price}
                  />
                ))}
              </ProductGrid>
            </Section>
          )}
        </>
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 27px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
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
