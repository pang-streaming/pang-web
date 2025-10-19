
export interface PostResponse {
    status: string; 
    message: string;
    data: Post;
    timestamp: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    content: string;
    likes: number;
    nickname: string;
    createdAt: string;
    updatedAt: string;
    liked: boolean;
    images?: string[]; // 게시글 이미지 URL 배열
  }



  export interface Pageable {
    unpaged: boolean;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: Sort;
  }
  
  export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  }
  
  export interface PostListData {
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    content: Post[];
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    empty: boolean;
  }
  