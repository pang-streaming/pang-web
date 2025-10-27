import { fetchMyInfo } from "@/entities/user/api";
import { User } from "@/entities/user/type";
import normalProfile from "@/app/assets/images/normal_profile.svg";
import * as S from "./style";
import { useQuery } from "@tanstack/react-query";
import { SkeletonBox } from "@/shared/ui/skeleton";

export const MyInfoSection = () => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["myInfo:user"],
    queryFn: async () => {
      const res = await fetchMyInfo();
      return res.data;
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <S.Container>
        <SkeletonBox width={90} height={90} radius={999} /> 
        <S.UserInfoSection>
          <SkeletonBox width={90} height={24} radius={6} />
          <SkeletonBox width={250} height={18} radius={6} />
          <SkeletonBox width={90} height={18} radius={6} />
        </S.UserInfoSection>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ProfileImage src={user?.profileImage || normalProfile} />
      <S.UserInfoSection>
        <S.Nickname>{user?.nickname}</S.Nickname>
        <S.Email>{user?.email}</S.Email>
        <S.StatusMessage>{user?.description}</S.StatusMessage>
      </S.UserInfoSection>
    </S.Container>
  );
};
