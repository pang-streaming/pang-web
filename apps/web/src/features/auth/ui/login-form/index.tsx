

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUser, FiLock } from "react-icons/fi";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import * as S from './style'
import Logo from "@/app/assets/logo.svg";
import { loginUser } from "../../api/login-api";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isActive = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    if (!isActive) return;

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("accessToken", data.data.accessToken);
      console.log("로그인 성공")
      navigate("/");
    } catch (error: any) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.LoginWrapper>
      <S.LeftSection>
        <S.LoginLogo src={Logo} alt="로고" />
        <S.LoginInputContainer>
          <S.LoginInputLeft>
            <S.LoginInputIcon>
              <FiUser size={20} color="#666" />
            </S.LoginInputIcon>
          </S.LoginInputLeft>
          <S.SectionDivider />
          <S.LoginInputRight
            placeholder="아이디를 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </S.LoginInputContainer>
        <S.LoginInputContainer>
          <S.LoginInputLeft>
            <S.LoginInputIcon>
              <FiLock size={20} color="#666" />
            </S.LoginInputIcon>
          </S.LoginInputLeft>
          <S.SectionDivider />
          <S.LoginInputRight
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </S.LoginInputContainer>
        <S.LoginButton
          disabled={!isActive || loading}
          isActive={isActive}
          onClick={handleLogin}
        >
          <S.LoginButtonText>
            {loading ? "로그인 중..." : "로그인"}
          </S.LoginButtonText>
        </S.LoginButton>

        <LoginDivider />
        <S.OauthContainer>
          <OauthBox logo="apple" />
          <OauthBox logo="google" />
        </S.OauthContainer>
        <div style={{ marginTop: "30px" }}>
          <S.SignUpText>
            가입된 계정이 없으신가요?{" "}
            <S.SignUpLink onClick={() => navigate("/signup")}>
              회원가입
            </S.SignUpLink>
          </S.SignUpText>
        </div>
      </S.LeftSection>

      <S.RightSection />
    </S.LoginWrapper>
  );
};

const LoginDivider = () => (
  <S.LoginDividerWrapper>
    <S.LoginDividerContainer />
    <S.DividerText>또는</S.DividerText>
    <S.LoginDividerContainer />
  </S.LoginDividerWrapper>
);

const OauthBox = ({ logo }: { logo: "apple" | "google" }) => (
  <S.OauthWrapper>
    {logo === "apple" && <FaApple size={28} />}
    {logo === "google" && <FcGoogle size={28} />}
  </S.OauthWrapper>
);
