import { VideoItem, IStreamDataResponse } from '../model/type';

export const dummyVideos: VideoItem[] = [
  {
    streamId: 'stream-001',
    title: '악마의 아이야ㅕㅆ죠?????? 아무도 못 맞혔죠?',
    url: '/dummy-images/thumbnail-1.png', 
    username: 'gamer123',
    nickname: '시라유키 히나',
    profileImage: '/dummy-images/thumbnail-1.png', 
  },
  {
    streamId: 'stream-002',
    title: '[ 에견녀 찌로 일어났따 ]',
    url: '/dummy-images/thumbnail-2.png', 
    username: 'cookingqueen',
    nickname: '네네코 마시로',
    profileImage: '/dummy-images/thumbnail-2.png', 
  },
  {
    streamId: 'stream-003',
    title: '( ܸ ⩌⩊⩌ ܸ )',
    url: '/dummy-images/thumbnail-3.png',
    username: 'musiclover',
    nickname: '강지',
    profileImage: '/dummy-images/thumbnail-3.png',
  },
  {
    streamId: 'stream-004',
    title: '닭도리탕love...',
    url: '/dummy-images/thumbnail-4.png',
    username: 'techgeek',
    nickname: '카린',
    profileImage: '/dummy-images/thumbnail-4.png',
  },
  {
    streamId: 'stream-005',
    title: '남성호르몬충전하는날 (복싱게임1:30)🥊',
    url: '/dummy-images/thumbnail-5.png',
    username: 'artcreator',
    nickname: '나나링 Nanaring',
    profileImage: '/dummy-images/thumbnail-5.png',
  },
  {
    streamId: 'stream-006',
    title: '에겐녀의 표본',
    url: '/dummy-images/thumbnail-6.png',
    username: 'gamer123',
    nickname: '유세라',
    profileImage: '/dummy-images/thumbnail-6.png',
  },
  {
    streamId: 'stream-007',
    title: '🍊🐇딸기맛 몬스터가 좋아요 ⌯･ㅅ･⌯ಣ🍊🐇',
    url: '/dummy-images/thumbnail-7.png',
    username: 'cookingqueen',
    nickname: '라비타',
    profileImage: '/dummy-images/thumbnail-7.png',
  },
  {
    streamId: 'stream-008',
    title: '채팅은 아니래요',
    url: '/dummy-images/thumbnail-8.png',
    username: 'musiclover',
    nickname: '임 설',
    profileImage: '/dummy-images/thumbnail-8.png',
  },
  {
    streamId: 'stream-009',
    title: '긴급회의',
    url: '/dummy-images/thumbnail-9.png',
    username: '토다기',
    nickname: '아주머',
    profileImage: '/dummy-images/thumbnail-9.png',
  },
  {
    streamId: 'stream-010',
    title: '반갑다 X세대 여러분',
    url: '/dummy-images/thumbnail-10.png',
    username: 'lifestyle',
    nickname: '디디디용',
    profileImage: '/dummy-images/thumbnail-10.png',
  }
];

export const getDummyStreamResponse = (streamId: string): IStreamDataResponse | null => {
  const video = dummyVideos.find(v => v.streamId === streamId);
  
  if (!video) return null;
  
  return {
    streamId: video.streamId,
    title: video.title,
    url: video.url,
    userId: `user-${video.username.substring(0, 3)}`,
    username: video.username,
    nickname: video.nickname,
    profileImage: video.profileImage || '',
    followers: Math.floor(Math.random() * 10000), 
  };
};

export const getDummyStreamsByUsername = (username: string): VideoItem[] => {
  return dummyVideos.filter(v => v.username === username);
};
