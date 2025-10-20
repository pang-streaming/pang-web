import styled from "styled-components";
import { CommunityItem } from "@/features/community/ui/community-item";
import { Tag, TagButton } from "@pang/shared/ui";
import { useState } from "react";
import { WritePostModal } from "@/features/community/widget/write-modal";
import { useNavigate } from "react-router-dom";
import { SkeletonBox } from "@/shared/ui/skeleton";
import { usePostList } from "../hook/useProfile";
import { useQueryClient } from "@tanstack/react-query";

const tags: Tag[] = [
  { id: "all", name: "전체" },
  { id: "notification", name: "공지" },
  { id: "free", name: "자유게시판" },
];

export const ProfileCommunityWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTagId, setActiveTagId] = useState<string>("all");
  const navigate = useNavigate(); 
  const queryClient = useQueryClient();

  const getFilter = (tagId: string): "ALL" | "OWNER_ONLY" | "NON_OWNER_ONLY" => {
    switch (tagId) {
      case "notification":
        return "OWNER_ONLY";
      case "free":
        return "NON_OWNER_ONLY";
      default:
        return "ALL";
    }
  };

  const { data, isLoading, isError } = usePostList({
    communityId: 1,
    filter: getFilter(activeTagId),
  });

  const handlePost = (id: number) => {
	navigate(`/community-detail/${id}`)
  }

  const handleWriteButton = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    console.log("게시글 업로드 성공");
    queryClient.invalidateQueries({ queryKey: ["postList"] });
  };

  const handleTagChange = (tagId: string | null) => {
    if (tagId) {
      setActiveTagId(tagId);
    }
  };

  const posts = data?.content || [];
  const activeTagName =
    tags.find((tag) => tag.id === activeTagId)?.name || "전체";
  

  return (
    <CommunityContainer>
      <CommunityTagWrapper>
        <TagButton 
          tags={tags} 
          defaultTagId={"all"} 
          onChanged={handleTagChange}
        />
        <WriteButton onClick={handleWriteButton}>글쓰기 +</WriteButton>
      </CommunityTagWrapper>

      <CommunityItemList>
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <CommunityItemSkeleton key={index} />
            ))}
          </>
        ) : isError ? (
          <EmptyMessage>게시글을 불러오는 중 오류가 발생했습니다 😢</EmptyMessage>
        ) : posts.length === 0 ? (
          <EmptyMessage>게시글이 없습니다 🥲</EmptyMessage>
        ) : (
          posts.map((post) => (
            <CommunityItem key={post.id} post={post} onClick={() => handlePost(post.id)} postType={activeTagName}/> 
          ))
        )}
      </CommunityItemList>

      {isModalOpen && (
        <WritePostModal
          communityId={1}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </CommunityContainer>
  );
};

const CommunityItemSkeleton = () => {
  return (
    <SkeletonContainer>
      <LeftSection>
        <SkeletonBox width={55} height={30} radius={6} />
        <SkeletonBox width={300} height={20} radius={4} />
      </LeftSection>
      <RightSection>
        <SkeletonBox width={80} height={20} radius={4} />
        <SkeletonBox width={100} height={20} radius={4} />
        <SkeletonBox width={40} height={20} radius={4} />
      </RightSection>
    </SkeletonContainer>
  );
};

const SkeletonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: ${({ theme }) => theme.borders.xlarge};
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 77px;
  margin-right: 50px;
`;

const CommunityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommunityTagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WriteButton = styled.button`
  outline: none;
  border: none;
  padding: 8px 10px;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const CommunityItemList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.large};
  padding: 40px 20px;
  text-align: center;
`;
