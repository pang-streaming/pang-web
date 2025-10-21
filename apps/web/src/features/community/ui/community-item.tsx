import styled from "styled-components";
import SmallHeart from "@/app/assets/smallHeart.svg?react";
import { Post } from "../model/post";

// interface CommunityItemProps {
// 	isNotification: boolean;
// }

export const CommunityItem = ({
  post,
  onClick,
  postType,
}: {
  post: Post;
  onClick?: () => void;
  postType: string;
}) => {
  const hasImages = post.images && post.images.length > 0;

  return (
    <CommunityItemContainer isNotification={false} onClick={onClick}>
      <LeftInfoWrapper>
        <Index isNotification={false}>{postType}</Index>
        <ContentWrapper>
          <Title>{post.title}</Title>
          {hasImages && (
            <ImagePreviewSmall>
              <ImageThumbnail src={post.images![0]} alt="썸네일" />
              {post.images!.length > 1 && (
                <ImageBadge>+{post.images!.length - 1}</ImageBadge>
              )}
            </ImagePreviewSmall>
          )}
        </ContentWrapper>
      </LeftInfoWrapper>
      <RightInfoWrapper>
        <Author>{post.nickname}</Author>
		<WriteTime>{post.createdAt.slice(0, 10)}</WriteTime>
        <LikeWrapper>
          <SmallHeart />
          <Like>{post.likes}</Like>
        </LikeWrapper>
      </RightInfoWrapper>
    </CommunityItemContainer>
  );
};

const CommunityItemContainer = styled.div<{ isNotification: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-radius: ${({ theme }) => theme.borders.xlarge};
  background-color: ${({ theme, isNotification }) =>
    isNotification ? `${theme.colors.secondary.normal}25` : "transparent"};
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.light};
  }
`;

const LeftInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0; /* 텍스트 오버플로우 방지 */
  gap: 20px;
`;

const Index = styled.span<{ isNotification: boolean }>`
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borders.medium};
  background-color: ${({ theme, isNotification }) =>
    isNotification ? theme.colors.secondary.normal : theme.colors.common.grey};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0; 
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;

const ImagePreviewSmall = styled.div`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
`;

const ImageThumbnail = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borders.medium};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  object-fit: cover;
`;

const ImageBadge = styled.span`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: ${({ theme }) => theme.font.small};
  padding: 2px 5px;
  border-radius: ${({ theme }) => theme.borders.small};
  font-weight: 600;
`;

const RightInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  gap: 25px;
  min-width: 280px; /* 일정 폭 확보해서 오른쪽 정렬 안정화 */
`;

const Author = styled.span`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WriteTime = styled.span`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.small};
  width: 100px;
  text-align: center;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  color: ${({theme}) => theme.colors.text.normal};

  width: 50px;
`;

const Like = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  color: ${({theme}) => theme.colors.text.normal};
`;
