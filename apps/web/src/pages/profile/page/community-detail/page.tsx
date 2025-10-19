import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  usePostDetail,
  useLikePost,
  useComment,
  useSendComment,
} from "@/features/community/hooks/usePostDetail";
import { IoArrowBack, IoHeart, IoHeartOutline, IoSend, IoRefresh } from "react-icons/io5";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import { Comment } from "@/features/community/model/comment";
import { SkeletonBox } from "@/shared/ui/skeleton";

export const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = parseInt(id || "0");
  const [commentContent, setCommentContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null); 
  const [replyContent, setReplyContent] = useState(""); 

  const { data: post, isLoading, error } = usePostDetail(postId);
  const { mutate: likeMutate, isPending: isLikePending } = useLikePost();
  const { data: commentsData, isLoading: isCommentsLoading, refetch: refetchComments } = useComment(postId);
  const { mutate: sendCommentMutate, isPending: isSendingComment } = useSendComment();

  console.log("commentsData:", commentsData);
  
  const rawComments: Comment[] = commentsData?.data || [];
  
  console.log("rawComments:", rawComments);
  console.log("rawComments.length:", rawComments.length);
  
  const organizedComments = rawComments.map(comment => ({
    ...comment,
    replies: comment.children || []
  }));
  
  console.log("organizedComments:", organizedComments);

  const handleLike = () => {
    if (post && !isLikePending) {
      likeMutate(post.id);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendComment = () => {
    if (commentContent.trim() && !isSendingComment) {
      sendCommentMutate(
        { postId, content: commentContent },
        {
          onSuccess: () => {
            setCommentContent("");
          },
        }
      );
    }
  };

  const handleSendReply = (parentId: number) => {
    if (replyContent.trim() && !isSendingComment) {
      sendCommentMutate(
        { postId, content: replyContent, parentId },
        {
          onSuccess: () => {
            setReplyContent("");
            setReplyingTo(null);
          },
        }
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const handleReplyKeyPress = (e: React.KeyboardEvent, parentId: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendReply(parentId);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingMessage>게시글을 불러오는 중...</LoadingMessage>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container>
        <ErrorMessage>게시글을 불러올 수 없습니다.</ErrorMessage>
        <BackButton onClick={handleBack}>이전으로</BackButton>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <IoArrowBack size={24} />
        </BackButton>
        <HeaderTitle>게시글</HeaderTitle>
        <div style={{ width: "24px" }} />
      </Header>

      <PostContainer>
        <PostHeader>
          <AuthorInfo>
            <AuthorAvatar src={normalProfile} />
            <AuthorDetails>
              <AuthorName>{post.nickname}</AuthorName>
              <PostDate>
                {new Date(post.createdAt).toLocaleDateString()}
              </PostDate>
            </AuthorDetails>
          </AuthorInfo>
          <LikeButton onClick={handleLike} disabled={isLikePending}>
            {post.liked ? (
              <IoHeart size={20} color="#ff4757" />
            ) : (
              <IoHeartOutline size={20} color="white"/>
            )}
            <LikeCount>{post.likes}</LikeCount>
          </LikeButton>
        </PostHeader>

        <PostTitle>{post.title}</PostTitle>

        <PostContent>{post.content}</PostContent>

        {/* 게시글 이미지 */}
        {post.images && post.images.length > 0 && (
          <PostImagesContainer>
            {post.images.map((imageUrl, index) => (
              <PostImage key={index} src={imageUrl} alt={`게시글 이미지 ${index + 1}`} />
            ))}
          </PostImagesContainer>
        )}

        <PostFooter>
          <PostMeta>
            <span>작성일: {new Date(post.createdAt).toLocaleString()}</span>
            {post.updatedAt !== post.createdAt && (
              <span>수정일: {new Date(post.updatedAt).toLocaleString()}</span>
            )}
          </PostMeta>
        </PostFooter>
      </PostContainer>

      <CommentsSection>
        <CommentsSectionHeader>
          <CommentsSectionTitle>
            댓글 {rawComments.length}개
          </CommentsSectionTitle>
          <RefreshButton onClick={() => refetchComments()} disabled={isCommentsLoading}>
            <IoRefresh size={20} />
          </RefreshButton>
        </CommentsSectionHeader>

        <CommentInputWrapper>
          <CommentInput
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="댓글을 입력하세요..."
            disabled={isSendingComment}
          />
          <SendButton
            onClick={handleSendComment}
            disabled={!commentContent.trim() || isSendingComment}
          >
            <IoSend size={20} />
          </SendButton>
        </CommentInputWrapper>

        <CommentsList>
          {isCommentsLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <CommentSkeleton key={index} />
              ))}
            </>
          ) : organizedComments.length === 0 ? (
            <EmptyComments>첫 번째 댓글을 작성해보세요!</EmptyComments>
          ) : (
            organizedComments.map((comment) => (
              <div key={comment.id}>
                <CommentItem>
                  <CommentAvatar src={comment.user.profileImageUrl || normalProfile} />
                  <CommentContent>
                    <CommentHeader>
                      <CommentAuthor>{comment.user.nickname}</CommentAuthor>
                      <CommentDate>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </CommentDate>
                    </CommentHeader>
                    <CommentText>{comment.content}</CommentText>
                    <ReplyButton onClick={() => setReplyingTo(comment.id)}>
                      답글 달기
                    </ReplyButton>
                  </CommentContent>
                </CommentItem>

                {replyingTo === comment.id && (
                  <ReplyInputWrapper>
                    <CommentInput
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      onKeyPress={(e) => handleReplyKeyPress(e, comment.id)}
                      placeholder={`${comment.user.nickname}님에게 답글 남기기...`}
                      disabled={isSendingComment}
                    />
                    <ReplyButtonGroup>
                      <CancelButton onClick={() => {
                        setReplyingTo(null);
                        setReplyContent("");
                      }}>
                        취소
                      </CancelButton>
                      <SendButton
                        onClick={() => handleSendReply(comment.id)}
                        disabled={!replyContent.trim() || isSendingComment}
                      >
                        <IoSend size={20} />
                      </SendButton>
                    </ReplyButtonGroup>
                  </ReplyInputWrapper>
                )}

                {/* 대댓글 목록 */}
                {comment.replies && comment.replies.length > 0 && (
                  <RepliesContainer>
                    {comment.replies.map((reply) => (
                      <ReplyItem key={reply.id}>
                        <CommentAvatar src={reply.user.profileImageUrl || normalProfile} />
                        <CommentContent>
                          <CommentHeader>
                            <CommentAuthor>{reply.user.nickname}</CommentAuthor>
                            <CommentDate>
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </CommentDate>
                          </CommentHeader>
                          <CommentText>{reply.content}</CommentText>
                        </CommentContent>
                      </ReplyItem>
                    ))}
                  </RepliesContainer>
                )}
              </div>
            ))
          )}
        </CommentsList>
      </CommentsSection>
    </Container>
  );
};

const CommentSkeleton = () => {
  return (
    <CommentItem>
      <SkeletonBox width={40} height={40} radius="50%" />
      <CommentContent>
        <SkeletonBox width="30%" height={16} radius={4} style={{ marginBottom: 8 }} />
        <SkeletonBox width="80%" height={14} radius={4} />
      </CommentContent>
    </CommentItem>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.normal};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px 0;
`;

const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  border-radius: ${({ theme }) => theme.borders.large};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.light};
  }
`;

const PostContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.xlarge};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borders.maximum};
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const PostDate = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: transparent;
  border-radius: ${({ theme }) => theme.borders.large};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.light};
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LikeCount = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const PostTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 16px;
  line-height: 1.4;
`;

const PostContent = styled.div`
  font-size: ${({ theme }) => theme.font.large};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 16px;
  white-space: pre-wrap;
`;

const PostImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borders.large};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const PostFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-top: 16px;
`;

const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text.subtitle};
  gap: 16px;
`;

/* ================= 댓글 스타일 ================= */

const CommentsSection = styled.div`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.xlarge};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const CommentsSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CommentsSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: transparent;
  border-radius: ${({ theme }) => theme.borders.large};
  color: ${({ theme }) => theme.colors.text.normal};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.light};
    transform: rotate(180deg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  background-color: ${({ theme }) => theme.colors.background.normal};
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: ${({ theme }) => theme.font.medium};
  resize: none;
  min-height: 48px;
  max-height: 120px;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  border-radius: ${({ theme }) => theme.borders.large};
  color: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }
`;

const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CommentAuthor = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const CommentDate = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const CommentText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`;

const EmptyComments = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.medium};
`;

/* ================= 대댓글 스타일 ================= */

const ReplyButton = styled.button`
  margin-top: 4px;
  padding: 4px 12px;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary.normal};
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }
`;

const ReplyInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  margin-left: 52px;
  margin-bottom: 16px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: ${({ theme }) => theme.borders.large};
`;

const ReplyButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.normal};
  border-radius: ${({ theme }) => theme.borders.medium};
  font-size: ${({ theme }) => theme.font.small};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.light};
  }
`;

const RepliesContainer = styled.div`
  margin-left: 52px;
  margin-top: 8px;
  padding-left: 16px;
  border-left: 2px solid ${({ theme }) => theme.colors.border.light};
`;

const ReplyItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`;
