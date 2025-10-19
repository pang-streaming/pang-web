import styled from "styled-components";
import { CommunityItem } from "@/features/community/ui/community-item";
import { Tag, TagButton } from "@pang/shared/ui";
import { useEffect, useState } from "react";
import { WritePostModal } from "@/features/community/widget/write-modal";
import { fetchPostList } from "@/features/community/api/api";
import { Post } from "@/features/community/model/post";
import { useNavigate } from "react-router-dom";
import { SkeletonBox } from "@/shared/ui/skeleton";

const tags: Tag[] = [
  { id: "all", name: "전체" },
  { id: "community", name: "자유게시판" },
  { id: "notification", name: "공지글" },
];

export const ProfileCommunityWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate(); 

  const [isLoading, setIsLoading] = useState(true);

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
  };

  useEffect(() => {
	const fetchData = async () => {
	  try {
		setIsLoading(true);
		const res = await fetchPostList();
		setPosts(res.content);
	  } catch (e) {
		console.error("게시글 불러오기 실패:", e);
	  } finally {
		setIsLoading(false);
	  }
	};
  
	fetchData();
  }, []);
  

  return (
    <CommunityContainer>
      <CommunityTagWrapper>
        <TagButton tags={tags} defaultTagId={"all"} />
        <WriteButton onClick={handleWriteButton}>글쓰기 +</WriteButton>
      </CommunityTagWrapper>

      <CommunityItemList>
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <CommunityItemSkeleton key={index} />
            ))}
          </>
        ) : posts.length === 0 ? (
          <EmptyMessage>게시글이 없습니다 🥲</EmptyMessage>
        ) : (
          posts.map((post) => (
            <CommunityItem key={post.id} post={post} onClick={() => handlePost(post.id)}/> 
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
