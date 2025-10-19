export interface ProductListResponse {
    status: string;
    message: string;
    data: ProductListData; 
    timestamp: string;
  }
  
  export interface ProductListData {
    content: ProductItem[];
    pageable: string | Pageable; 
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    empty: boolean;
  }
  
  export interface ProductItem {
    id: string;
    image: string;
    name: string;
    price: number;
    isLiked: boolean; 
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: Sort;
  }
  
  export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  }
  



//product detaul
  export interface ProductDetailData {
    image: string;
    name: string;
    likes: number;
    price: number;
    userId: string;
    profileImage: string;
    username: string;
  }
  

export interface ProductDetailResponse {
    status: string;
    message: string;
    data: ProductDetailData;
    timestamp: string;
  }


  export interface TopFiveProduct {
    id: string,
      image: string,
      name: string,
      price: number,
      isLiked: boolean
  }


  export interface CategoryByProductItem {
    id: string;
    image: string;
    name: string;
    price: number;
    isLiked: boolean;
  }
  
  export interface CategoryByProductResponse {
    status: string;        
    message: string;       
    data: CategoryByProductItem[];
    timestamp: string;    
  }
  