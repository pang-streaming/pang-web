
export interface CommentResponse {
  status: string;
  message: string;
  data: Comment;
  timestamp: string;
}

export interface Comment {
  id: number;
  content: string;
  user: {
    nickname: string;
    profileImageUrl: string;
  };
  createdAt: string;
  modifiedAt: string;
  parentId?: number | null;
  children?: Comment[]; // 서버에서 제공하는 대댓글 목록
  replies?: Comment[]; // 클라이언트에서 구성하는 대댓글 목록
}
