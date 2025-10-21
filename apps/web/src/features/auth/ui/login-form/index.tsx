import { SharedLoginForm } from "@pang/shared/ui";
import { toast } from "react-toastify";
import banner1 from '@/app/assets/banner1.png';
import banner2 from '@/app/assets/banner2.png';
import Logo from '@/app/assets/logo.svg';

export const LoginForm = () => {
  const handleLoginError = (error: any) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || "";

    if (status === 401) {
      toast.error("비밀번호가 일치하지 않습니다.");
    } else if (
      message.includes(
        'Cannot invoke "com.pangapiserver.domain.user.entity.UserEntity.getPassword()" because "user" is null'
      )
    ) {
      toast.error("등록된 사용자가 없습니다.");
    } else {
      toast.error(message || "로그인 실패");
    }
  };

  return (
    <SharedLoginForm
      redirectTo="/"
      signupUrl="/signup"
      onLoginError={handleLoginError}
      banner1Image={banner1}
      banner2Image={banner2}
      logoImage={Logo}
    />
  );
};
