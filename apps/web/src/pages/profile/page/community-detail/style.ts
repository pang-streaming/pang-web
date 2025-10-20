import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.normal};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px 0;
`;

export const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const BackButton = styled.button`
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

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text.subtitle};
  gap: 16px;
`;

/* ================= 게시글 스타일 ================= */

export const PostContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.xlarge};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AuthorAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borders.maximum};
`;

export const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const PostDate = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

export const LikeButton = styled.button`
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

export const LikeCount = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const PostTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 16px;
  line-height: 1.4;
`;

export const PostContent = styled.div`
  font-size: ${({ theme }) => theme.font.large};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 16px;
  white-space: pre-wrap;
`;

export const PostImagesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
`;

export const PostImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borders.large};
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const PostFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-top: 16px;
`;

export const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

/* ================= 댓글 스타일 ================= */

export const CommentsSection = styled.div`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.xlarge};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const CommentsSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CommentsSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.xLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin: 0;
`;

export const RefreshButton = styled.button`
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

export const CommentInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

export const CommentInput = styled.textarea`
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

export const SendButton = styled.button`
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

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CommentAuthor = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const CommentDate = styled.span`
  font-size: ${({ theme }) => theme.font.small};
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

export const CommentText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.colors.text.normal};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const EmptyComments = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.medium};
`;

/* ================= 대댓글 스타일 ================= */

export const ReplyButton = styled.button`
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

export const ReplyInputWrapper = styled.div`
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

export const ReplyButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
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

export const RepliesContainer = styled.div`
  margin-left: 52px;
  margin-top: 8px;
  padding-left: 16px;
  border-left: 2px solid ${({ theme }) => theme.colors.border.light};
`;

export const ReplyItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }
`;

