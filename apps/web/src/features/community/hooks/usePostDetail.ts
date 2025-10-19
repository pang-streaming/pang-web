import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComments, fetchPostDetail, likePost, sendComment } from "../api/api";
import { Post } from "../model/post";

export const usePostDetail = (postId: number) => {
  return useQuery<Post>({
    queryKey: ["postDetail", postId],
    queryFn: async () => {
      const res = await fetchPostDetail(postId);
      return res.data;
    },
    enabled: !!postId,
    refetchOnWindowFocus: false,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["postDetail", postId] });
      await queryClient.cancelQueries({ queryKey: ["postList"] });

      const previousPost = queryClient.getQueryData<Post>(["postDetail", postId]);
      const previousPostList = queryClient.getQueryData<Post[]>(["postList"]);

      if (previousPost) {
        queryClient.setQueryData<Post>(["postDetail", postId], {
          ...previousPost,
          liked: !previousPost.liked,
          likes: previousPost.liked ? previousPost.likes - 1 : previousPost.likes + 1,
        });
      }

      if (previousPostList) {
        const updatedPostList = previousPostList.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                liked: !post.liked, 
                likes: post.liked ? post.likes - 1 : post.likes + 1 
              }
            : post
        );
        queryClient.setQueryData<Post[]>(["postList"], updatedPostList);
      }

      return { previousPost, previousPostList };
    },
    onError: (err, postId, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData<Post>(["postDetail", postId], context.previousPost);
      }
      if (context?.previousPostList) {
        queryClient.setQueryData<Post[]>(["postList"], context.previousPostList);
      }
      console.error("좋아요 처리 중 오류가 발생했습니다:", err);
    },
    onSettled: (_, __, postId) => {
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
      queryClient.invalidateQueries({ queryKey: ["postList"] });
    },
  });
};


export const useComment = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await fetchComments(postId);
      console.log("useComment - fetchComments 응답:", response);
      // API 응답 구조가 { data: Comment[] } 형태일 수 있으므로 확인
      return response;
    },
    enabled: !!postId,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};


export const useSendComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["comments", newComment.postId] });

      const previousComments = queryClient.getQueryData(["comments", newComment.postId]);

      queryClient.setQueryData(["comments", newComment.postId], (old: any) => {
        if (!old) return old;
        
        const tempComment = {
          id: Date.now(),
          content: newComment.content,
          user: {
            nickname: "나",
            profileImageUrl: "",
          },
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
          parentId: newComment.parentId || null,
          children: [],
        };

        // 서버 응답 구조: { status, message, data: [...], timestamp }
        return {
          ...old,
          data: [...(old.data || []), tempComment],
        };
      });

      return { previousComments };
    },
    onSuccess: (_, variables) => {
      // 서버에서 최신 데이터 가져오기
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] });
    },
    onError: (error, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", variables.postId], context.previousComments);
      }
      console.error("댓글 전송 실패", error);
    },
  });
};
