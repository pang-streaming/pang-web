import { useState } from "react";
import { IoSend, IoRefresh } from "react-icons/io5";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import { Comment } from "@/features/community/model/comment";
import { CommentItemComponent } from "./comment-item";
import { ReplyInput } from "./ReplyInput";
import { SkeletonBox } from "@/shared/ui/skeleton";
import * as S from "../style";

interface CommentSectionProps {
  comments: Comment[];
  isLoading: boolean;
  onRefresh: () => void;
  onSendComment: (content: string) => void;
  onSendReply: (parentId: number, content: string) => void;
  isSending: boolean;
}

export const CommentSection = ({
  comments,
  isLoading,
  onRefresh,
  onSendComment,
  onSendReply,
  isSending,
}: CommentSectionProps) => {
  const [commentContent, setCommentContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSendComment = () => {
    if (commentContent.trim() && !isSending) {
      onSendComment(commentContent);
      setCommentContent("");
    }
  };

  const handleSendReply = (parentId: number) => {
    if (replyContent.trim() && !isSending) {
      onSendReply(parentId, replyContent);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const organizedComments = comments.map(comment => ({
    ...comment,
    replies: comment.children || []
  }));

  return (
    <S.CommentsSection>
      <S.CommentsSectionHeader>
        <S.CommentsSectionTitle>댓글 {comments.length}개</S.CommentsSectionTitle>
        <S.RefreshButton onClick={onRefresh} disabled={isLoading}>
          <IoRefresh size={20} />
        </S.RefreshButton>
      </S.CommentsSectionHeader>

      <S.CommentInputWrapper>
        <S.CommentInput
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="댓글을 입력하세요..."
          disabled={isSending}
        />
        <S.SendButton
          onClick={handleSendComment}
          disabled={!commentContent.trim() || isSending}
        >
          <IoSend size={20} />
        </S.SendButton>
      </S.CommentInputWrapper>

      <S.CommentsList>
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <CommentSkeleton key={index} />
            ))}
          </>
        ) : organizedComments.length === 0 ? (
          <S.EmptyComments>첫 번째 댓글을 작성해보세요!</S.EmptyComments>
        ) : (
          organizedComments.map((comment) => (
            <div key={comment.id}>
              <CommentItemComponent
                comment={comment}
                onReply={setReplyingTo}
              />

              {replyingTo === comment.id && (
                <ReplyInput
                  value={replyContent}
                  onChange={setReplyContent}
                  onSend={() => handleSendReply(comment.id)}
                  onCancel={() => {
                    setReplyingTo(null);
                    setReplyContent("");
                  }}
                  placeholder={`${comment.user.nickname}님에게 답글 남기기...`}
                  disabled={isSending}
                />
              )}

              {comment.replies && comment.replies.length > 0 && (
                <S.RepliesContainer>
                  {comment.replies.map((reply) => (
                    <S.ReplyItem key={reply.id}>
                      <S.CommentAvatar src={reply.user.profileImageUrl || normalProfile} />
                      <S.CommentContent>
                        <S.CommentHeader>
                          <S.CommentAuthor>{reply.user.nickname}</S.CommentAuthor>
                          <S.CommentDate>
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </S.CommentDate>
                        </S.CommentHeader>
                        <S.CommentText>{reply.content}</S.CommentText>
                      </S.CommentContent>
                    </S.ReplyItem>
                  ))}
                </S.RepliesContainer>
              )}
            </div>
          ))
        )}
      </S.CommentsList>
    </S.CommentsSection>
  );
};

const CommentSkeleton = () => {
  return (
    <S.CommentItem>
      <SkeletonBox width={40} height={40} radius="50%" />
      <S.CommentContent>
        <SkeletonBox width="30%" height={16} radius={4} style={{ marginBottom: 8 }} />
        <SkeletonBox width="80%" height={14} radius={4} />
      </S.CommentContent>
    </S.CommentItem>
  );
};

