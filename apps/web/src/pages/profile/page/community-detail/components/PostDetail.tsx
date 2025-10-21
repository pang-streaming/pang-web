import { IoHeart, IoHeartOutline } from "react-icons/io5";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import { Post } from "@/features/community/model/post";
import * as S from "../style";
import { useQuery } from "@tanstack/react-query";
import { fetchMyInfo, fetchOtherUserInfo } from "@/entities/user/api/api";

interface PostDetailProps {
  post: Post;
  onLike: () => void;
  isLikePending: boolean;
}

export const PostDetail = ({ post, onLike, isLikePending }: PostDetailProps) => {
  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
  // const { data } = useQuery({
  //   queryKey: ["otherUserInfo"],
  //   queryFn: () => {
  //     fetchOtherUserInfo(post.)
  //   },
  //   staleTime: 1000 * 60,
  //   refetchOnWindowFocus: false,
  // });
  return (
    <S.PostContainer>
      <S.PostHeader>
        <S.AuthorInfo>
          <S.AuthorAvatar src={normalProfile} />
          <S.AuthorDetails>
            <S.AuthorName>{post.nickname}</S.AuthorName>
            <S.PostDate>
              {new Date(post.createdAt).toLocaleDateString()}
            </S.PostDate>
          </S.AuthorDetails>
        </S.AuthorInfo>
        <S.LikeButton onClick={onLike} disabled={isLikePending}>
          {post.liked ? (
            <IoHeart size={20} color="#ff4757" />
          ) : (
            <IoHeartOutline size={20} color="white" />
          )}
          <S.LikeCount>{post.likes}</S.LikeCount>
        </S.LikeButton>
      </S.PostHeader>

      <S.PostTitle>{post.title}</S.PostTitle>

      <S.PostContent>{post.content}</S.PostContent>

      {post.images && post.images.length > 0 && (
        <S.PostImagesContainer>
          {post.images.map((imageUrl, index) => (
            <S.PostImage key={index} src={imageUrl} alt={`게시글 이미지 ${index + 1}`} />
          ))}
        </S.PostImagesContainer>
      )}

      <S.PostFooter>
        <S.PostMeta>
          <span>작성일: {new Date(post.createdAt).toLocaleString()}</span>
          {post.updatedAt !== post.createdAt && (
            <span>수정일: {new Date(post.updatedAt).toLocaleString()}</span>
          )}
        </S.PostMeta>
      </S.PostFooter>
    </S.PostContainer>
  );
};

