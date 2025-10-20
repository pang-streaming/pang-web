export interface StreamSearchResponse {
    status: string;
    message: string;
    data: {
      content: SearchStream[];
      pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
          unsorted: boolean;
          sorted: boolean;
          empty: boolean;
        };
        offset: number;
        unpaged: boolean;
        paged: boolean;
      };
      totalPages: number;
      totalElements: number;
      last: boolean;
      numberOfElements: number;
      first: boolean;
      size: number;
      number: number;
      sort: {
        unsorted: boolean;
        sorted: boolean;
        empty: boolean;
      };
      empty: boolean;
    };
    timestamp: string;
  }
  
  export interface SearchStream {
    id: string;
    title: string;
    thumbnail: string;
    streamerName: string;
    viewerCount: number;
  }
  