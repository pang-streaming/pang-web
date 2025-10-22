import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import { loginUser } from "./login-api";
import { tokenStorage } from "../../lib/cookie";
import * as S from "./login-form-style";

interface SharedLoginFormProps {
  redirectTo?: string;
  signupUrl?: string;
  onLoginSuccess?: () => void;
  onLoginError?: (error: any) => void;
  banner1Image: string;
  banner2Image: string;
  logoImage: string;
}

export const SharedLoginForm = ({
  redirectTo = "/",
  signupUrl = "/signup",
  onLoginSuccess,
  onLoginError,
  banner1Image,
  banner2Image,
  logoImage,
}: SharedLoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const $isActive = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    if (!$isActive) return;

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      
      tokenStorage.setAccessToken(data.data.accessToken);
      if (data.data.refreshToken) {
        tokenStorage.setRefreshToken(data.data.refreshToken);
      }
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }

      const redirectParam = searchParams.get("redirect");
      if (redirectParam === "streamer") {
        // window.location.href 사용 (전체 페이지 리로드)
        window.location.href = import.meta.env.VITE_STREAMER_URL;
      } else {
        // SPA 내부 네비게이션
        navigate(redirectTo);
      }
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message || "";

      if (onLoginError) {
        onLoginError(error);
      } else {
        if (status === 401) {
          alert("비밀번호가 일치하지 않습니다.");
        } else if (
          message.includes(
            'Cannot invoke "com.pangapiserver.domain.user.entity.UserEntity.getPassword()" because "user" is null'
          )
        ) {
          alert("등록된 사용자가 없습니다.");
        } else {
          alert(message || "로그인 실패");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.LoginWrapper>
      <S.LeftSection>
        <S.LoginLogo src={logoImage} alt="로고" />
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
          disabled={!$isActive || loading}
          $isActive={$isActive}
          onClick={handleLogin}
        >
          <S.LoginButtonText>
            {loading ? "로그인 중..." : "로그인"}
          </S.LoginButtonText>
        </S.LoginButton>

        {redirectTo === "/streaming" ? (
          <></>
        ) : (
          <div style={{ marginTop: "30px" }}>
            <S.SignUpText>
              가입된 계정이 없으신가요?{" "}
              <S.SignUpLink onClick={() => navigate(signupUrl)}>
                회원가입
              </S.SignUpLink>
            </S.SignUpText>
          </div>
        )}
      </S.LeftSection>

      <S.RightSection>
        <S.BannerContainer>
          {[...Array(10)].map((_, i) => (
            <S.BannerImage
              key={`banner1-${i}`}
              src={i % 2 === 0 ? banner1Image : banner2Image}
              alt={`Banner ${i % 2 === 0 ? 1 : 2}`}
            />
          ))}
        </S.BannerContainer>
        <S.BannerContainer2>
          {[...Array(10)].map((_, i) => (
            <S.BannerImage2
              key={`banner2-${i}`}
              src={i % 2 === 0 ? banner2Image : banner1Image}
              alt={`Banner ${i % 2 === 0 ? 2 : 1}`}
            />
          ))}
        </S.BannerContainer2>
      </S.RightSection>
    </S.LoginWrapper>
  );
};
