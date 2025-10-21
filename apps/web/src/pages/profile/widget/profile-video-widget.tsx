import { useLastVideoByUsername } from "@/entities/last-video/useLastVideo";
import { IStreamDataResponse } from "@/entities/video/model/type";
import { ErrorScreen } from "@/shared/ui/error-screen";
import { SkeletonGrid } from "@/shared/ui/skeleton";
import { VideoList } from "@/shared/ui/video/video-list";

export const ProfileVideoWidget = ({username}:{username: string}) => {
  const { data: lastVideoData, isLoading, isError, error } = useLastVideoByUsername(username);

  console.log("username:", username);
  console.log("lastVideoData:", lastVideoData);

  if (isLoading) return (
    <div>
      <SkeletonGrid columns={4} itemHeight={220}/>
    </div>
  )
  if (isError) return <ErrorScreen error={String(error)} />;
  if (!lastVideoData || !lastVideoData.data || lastVideoData.data.length === 0) {
    return <p style={{ color: 'white', padding: '20px', textAlign: 'center' }}>등록된 영상이 없습니다.</p>;
  }
  
  const videos: IStreamDataResponse[] = lastVideoData.data.map(video => ({
    streamId: video.streamId,
    title: video.title,
    url: video.url,
    userId: video.username,
    username: video.username,
    nickname: video.nickname,
    profileImage: video.profileImage,
    followers: 0,
    thumbnail: video.thumbnail || "",
  }));
  
  return <VideoList videos={videos} maxColumns={4} />;
};
