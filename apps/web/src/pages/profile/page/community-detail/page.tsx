import { useParams, useNavigate } from "react-router-dom";
import {
  usePostDetail,
  useLikePost,
  useComment,
  useSendComment,
} from "@/features/community/hooks/usePostDetail";
import { IoArrowBack } from "react-icons/io5";
import { Comment } from "@/features/community/model/comment";
import { PostDetail } from "./components/PostDetail";
import { CommentSection } from "./components/comment-section";
import * as S from "./style";

export const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = parseInt(id || "0");

  const { data: post, isLoading, error } = usePostDetail(postId);
  const { mutate: likeMutate, isPending: isLikePending } = useLikePost();
  const { data: commentsData, isLoading: isCommentsLoading, refetch: refetchComments } = useComment(postId);
  const { mutate: sendCommentMutate, isPending: isSendingComment } = useSendComment();
  
  const rawComments: Comment[] = commentsData?.data || [];

  const handleLike = () => {
    if (post && !isLikePending) {
      likeMutate(post.id);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendComment = (content: string) => {
    if (content.trim() && !isSendingComment) {
      sendCommentMutate({ postId, content });
    }
  };

  const handleSendReply = (parentId: number, content: string) => {
    if (content.trim() && !isSendingComment) {
      sendCommentMutate({ postId, content, parentId });
    }
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingMessage>게시글을 불러오는 중...</S.LoadingMessage>
      </S.Container>
    );
  }

  if (error || !post) {
    return (
      <S.Container>
        <S.ErrorMessage>게시글을 불러올 수 없습니다.</S.ErrorMessage>
        <S.BackButton onClick={handleBack}>이전으로</S.BackButton>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={handleBack}>
          <IoArrowBack size={24} />
        </S.BackButton>
        <S.HeaderTitle>게시글</S.HeaderTitle>
        <div style={{ width: "24px" }} />
      </S.Header>

      <PostDetail post={post} onLike={handleLike} isLikePending={isLikePending} />

      <CommentSection
        comments={rawComments}
        isLoading={isCommentsLoading}
        onRefresh={refetchComments}
        onSendComment={handleSendComment}
        onSendReply={handleSendReply}
        isSending={isSendingComment}
      />
    </S.Container>
  );
};
