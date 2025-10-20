import normalProfile from "@/app/assets/images/normal_profile.svg";
import { Comment } from "@/features/community/model/comment";
import * as S from "../style";
import { useNavigate } from "react-router-dom";

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: number) => void;
}

export const CommentItemComponent = ({ comment, onReply }: CommentItemProps) => {
  const navigate = useNavigate();
  const handleAvatar = () => {
    // navigate(`/profile/${comment.user.}`)
  }
  return (
    <S.CommentItem>
      <S.CommentAvatar  src={comment.user.profileImageUrl || normalProfile} />
      <S.CommentContent>
        <S.CommentHeader>
          <S.CommentAuthor>{comment.user.nickname}</S.CommentAuthor>
          <S.CommentDate>
            {new Date(comment.createdAt).toLocaleDateString()}
          </S.CommentDate>
        </S.CommentHeader>
        <S.CommentText>{comment.content}</S.CommentText>
        <S.ReplyButton onClick={() => onReply(comment.id)}>
          답글 달기
        </S.ReplyButton>
      </S.CommentContent>
    </S.CommentItem>
  );
};

