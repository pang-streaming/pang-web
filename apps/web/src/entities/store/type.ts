
export interface Store {
    id: string;
    name: string;
    description: string;
    profileImage: string;
    bannerImage: string;
  }
  
  export interface StoreResponse {
    status: string;
    message: string;
    data: Store[];
    timestamp: string;
  }
  


export interface StoreProduct {
    id: string;
    image: string;
    name: string;
    price: number;
    isLiked: boolean;
  }

  export interface StoreProductResponse {
    status: string;
    message: string;
    data: StoreProduct[];
    timestamp: string;
  }
  