import api from "@/api/api";
import { Post, PostListData, PostResponse } from "../model/post";

export const fetchPostDetail = async (postId: number): Promise<PostResponse> => {
  const res = await api.get("/post", {
    params: { postId }, 
  });
  return res.data;
};

export const uploadPost = async ({title, content, communityId, images} : {title: string, content: string, communityId: number, images?: string[]}) => {
  const res = await api.post("/post", {
    title: title,
    content: content,
    communityId: communityId,
    images: images
  });
  return res.data;
};

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file); 
    const res = await api.post("/post/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };

export const likePost = async (postId: number) => {
  const res = await api.post(`/post/like/${postId}`);
  return res.data;
};


interface PostListQuery {
  page?: number;
  size?: number;
  sort?: string[];
  filter?: "ALL" | "OWNER_ONLY" | "NON_OWNER_ONLY";
}

export const fetchPostList = async (
  communityId: number,
  query?: PostListQuery
): Promise<PostListData> => {
  const res = await api.get(`/post/${communityId}`, {
    params: {
      ...query,
     
      filter: query?.filter !== "ALL" ? query?.filter : undefined,
    },
  });

  return res.data.data;
};

  
  

//---------------댓글--------------------

export const fetchComments = async (postId: number) => {
  const res = await api.get(`/post/comment/${postId}`);
  console.log("fetchComments 응답:", res.data);
  console.log("댓글 데이터:", res.data.data);
  return res.data;
}


export interface CommentRequest {
  postId: number;
  content: string;
  parentId?: number; 
}

export const sendComment = async ({ postId, content, parentId }: CommentRequest) => {
  const requestBody: any = {
    postId,
    content,
  };
  
  if (parentId !== undefined) {
    requestBody.parentId = parentId;
  }
  
  const res = await api.post('/post/comment', requestBody);
  return res.data;
};