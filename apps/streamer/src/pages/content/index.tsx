import { FC, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import * as S from './content.style';

interface ContentItem {
  id: number;
  title: string;
  date: string;
  views: string;
  thumbnail: string;
}

export const ContentPage: FC = () => {
  const [activeTab, setActiveTab] = useState<'streaming' | 'video'>('streaming');
  
  const streamingItems: ContentItem[] = [
    {
      id: 1,
      title: '대듀의 배틀그라운드',
      date: '2025-04-01 18:59:36',
      views: '5월 6일 삭제 예정',
      thumbnail: '',
    },
    {
      id: 2,
      title: '대듀의 배틀그라운드',
      date: '2025-04-01 18:59:36',
      views: '5월 6일 삭제 예정',
      thumbnail: '',
    },
    {
      id: 3,
      title: '대듀의 배틀그라운드',
      date: '2025-04-01 18:59:36',
      views: '5월 6일 삭제 예정',
      thumbnail: '',
    },
    {
      id: 4,
      title: '대듀의 배틀그라운드',
      date: '2025-04-01 18:59:36',
      views: '5월 6일 삭제 예정',
      thumbnail: '',
    },
    {
      id: 5,
      title: '대듀의 배틀그라운드',
      date: '2025-04-01 18:59:36',
      views: '5월 6일 삭제 예정',
      thumbnail: '',
    }
  ];
  
  const videoItems: ContentItem[] = [
    {
      id: 1,
      title: '대듀의 배틀그라운드',
      date: '2025-04-01 18:59:36',
      views: '5월 6일 삭제 예정',
      thumbnail: '',
    },
    {
      id: 2,
      title: '대듀의 배틀그라운드',
      date: '2025-04-01 18:59:36',
      views: '5월 6일 삭제 예정',
      thumbnail: '',
    },
    {
      id: 3,
      title: '대듀의 배틀그라운드',
      date: '2025-04-01 18:59:36',
      views: '5월 6일 삭제 예정',
      thumbnail: '',
    },
    {
      id: 4,
      title: '대듀의 배틀그라운드',
      date: '2025-04-01 18:59:36',
      views: '5월 6일 삭제 예정',
      thumbnail: '',
    }
  ];
  
  return (
    <S.ContentContainer>
      <S.ContentHeader>
        <button 
          className={activeTab === 'streaming' ? 'active' : ''}
          onClick={() => setActiveTab('streaming')}
        >
          라이브 스트리밍
        </button>
        <button 
          className={activeTab === 'video' ? 'active' : ''}
          onClick={() => setActiveTab('video')}
        >
          동영상
        </button>
      </S.ContentHeader>
      
      {activeTab === 'streaming' ? (
        <>
          <S.ContentList>
            {streamingItems.map(item => (
              <S.ContentItem key={item.id}>
                <S.Thumbnail />
                <S.ContentInfo>
                  <h3>{item.title}</h3>
                  <div className="date">{item.date}</div>
                  <div className="views">{item.views}</div>
                </S.ContentInfo>
                <S.ActionButtons>
                  <S.ActionButton>다시보기</S.ActionButton>
                  <S.ActionButton variant="primary">업로드</S.ActionButton>
                </S.ActionButtons>
              </S.ContentItem>
            ))}
          </S.ContentList>
        </>
      ) : (
        <>
          <S.UploadButton>
            <FaUpload />
            동영상 업로드
          </S.UploadButton>
          <S.ContentList>
            {videoItems.map(item => (
              <S.ContentItem key={item.id}>
                <S.Thumbnail />
                <S.ContentInfo>
                  <h3>{item.title}</h3>
                  <div className="date">{item.date}</div>
                  <div className="views">{item.views}</div>
                </S.ContentInfo>
                <S.ActionButtons>
                  <S.ActionButton>삭제</S.ActionButton>
                  <S.ActionButton variant="primary">수정</S.ActionButton>
                </S.ActionButtons>
              </S.ContentItem>
            ))}
          </S.ContentList>
        </>
      )}
    </S.ContentContainer>
  );
};