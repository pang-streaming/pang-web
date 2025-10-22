import { IStreamDataResponse } from "@/entities/video/model/type";
import { HeaderVideo } from "@/entities/video/ui/header-video";
import { useLiveByUsername } from "@/entities/video/hooks/useLive";
import { ErrorScreen } from "@/shared/ui/error-screen";
import { SkeletonGrid } from "@/shared/ui/skeleton";

interface ProfileHomeWidgetProps {
  username: string;
}

export const ProfileHomeWidget = ({ username }: ProfileHomeWidgetProps) => {
  const { data: liveData, isLoading, isError, error } = useLiveByUsername(username);

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <SkeletonGrid columns={1} itemHeight={340} count={1}/>
      </div>
    );
  }

  if (isError) {
    return <ErrorScreen error="방송 중인 라이브가 없습니다." />;
  }

  if (!liveData || liveData.length === 0) {
    return (
      <div style={{ color: 'white', padding: '40px', textAlign: 'center' }}>
        현재 방송 중이 아닙니다.
      </div>
    );
  }

  return <HeaderVideo videos={liveData} hideProfile />;
};
