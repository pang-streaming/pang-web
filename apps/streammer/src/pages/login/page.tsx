import { SharedLoginForm } from "@pang/shared/ui";
const banner1 = "http://localhost:5173/src/app/assets/banner1.png";
const banner2 = "http://localhost:5173/src/app/assets/banner2.png";
const logo = "http://localhost:5173/src/app/assets/pang-white.svg";

export const Login = () => {
  const handleLoginError = (error: any) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || "";

    if (status === 401) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (message.includes("null")) {
      alert("등록된 사용자가 없습니다.");
    } else {
      alert(message || "로그인 실패");
    }
  };

  return (
    <SharedLoginForm
      redirectTo="/"
      onLoginError={handleLoginError}
      banner1Image={banner1}
      banner2Image={banner2}
      logoImage={logo}
    />
  );
};

