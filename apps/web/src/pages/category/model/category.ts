export interface CategoryItem {
  id: string;
  categoryTitle: string;
  categoryChipCount: number;
  categoryLiveCount: number;
  categoryThumbnail?: string;
}

export const categories: CategoryItem[] = [
  { 
    id: 'lol',
    categoryTitle: "리그오브레전드", 
    categoryChipCount: 126315, 
    categoryLiveCount: 201,
    categoryThumbnail: '/category-images/lol.png'
  },
  { 
    id: 'lostark',
    categoryTitle: "로스트아크", 
    categoryChipCount: 126315, 
    categoryLiveCount: 201,
    categoryThumbnail: '/category-images/lostark.png'
  },
  { 
    id: 'pubg',
    categoryTitle: "배틀그라운드", 
    categoryChipCount: 126315, 
    categoryLiveCount: 201,
    categoryThumbnail: '/category-images/pubg.png' 
  },
  { 
    id: 'maple',
    categoryTitle: "메이플스토리", 
    categoryChipCount: 126315, 
    categoryLiveCount: 201,
    categoryThumbnail: '/category-images/maple.png' 
  },
  { 
    id: 'forza',
    categoryTitle: "포르자 호라이즌 5", 
    categoryChipCount: 126315, 
    categoryLiveCount: 201,
    categoryThumbnail: '/category-images/forza.webp' 
  }
];
