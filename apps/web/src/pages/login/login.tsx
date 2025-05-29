import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  DividerText,
  LeftSection,
  LoginButton,
  SignUpText,
  SignUpLink,
  LoginButtonText,
  LoginDividerContainer,
  LoginDividerWrapper,
  LoginInputContainer,
  LoginInputIcon,
  LoginInputLeft,
  LoginInputRight,
  LoginLogo,
  LoginWrapper,
  OauthContainer,
  OauthWrapper,
  SectionDivider,
  RightSection,
} from "./login.style";

import Logo from "../../assets/logo.svg";
import { FiUser, FiLock } from "react-icons/fi";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { login } from "../../services/auth";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const isActive = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async () => {
    if (!isActive) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message || error.message || "로그인 실패"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LeftSection>
        <LoginLogo src={Logo} alt="로고" />

        <LoginInputContainer>
          <LoginInputLeft>
            <LoginInputIcon>
              <FiUser size={20} color="#666" />
            </LoginInputIcon>
          </LoginInputLeft>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SectionDivider />
          </div>

          <LoginInputRight
            placeholder="아이디를 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LoginInputContainer>

        <LoginInputContainer>
          <LoginInputLeft>
            <LoginInputIcon>
              <FiLock size={20} color="#666" />
            </LoginInputIcon>
          </LoginInputLeft>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SectionDivider />
          </div>

          <LoginInputRight
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginInputContainer>

        <LoginButton
          disabled={!isActive || loading}
          isActive={isActive}
          onClick={handleLogin}
        >
          <LoginButtonText>
            {loading ? "로그인 중..." : "로그인"}
          </LoginButtonText>
        </LoginButton>

        <LoginDivider />

        <OauthContainer>
          <OauthBox logo="apple" />
          <OauthBox logo="google" />
        </OauthContainer>

        <div style={{ marginTop: "30px" }}>
          <SignUpText>
            가입된 계정이 없으신가요?{" "}
            <SignUpLink onClick={() => navigate("/signup")}>
              회원가입
            </SignUpLink>
          </SignUpText>
        </div>
      </LeftSection>

      <RightSection />
    </LoginWrapper>
  );
};

const LoginDivider = () => {
  return (
    <LoginDividerWrapper>
      <LoginDividerContainer />
      <DividerText>또는</DividerText>
      <LoginDividerContainer />
    </LoginDividerWrapper>
  );
};

const OauthBox = ({ logo }: { logo: "apple" | "google" }) => {
  return (
    <OauthWrapper>
      {logo === "apple" && <FaApple size={28} />}
      {logo === "google" && <FcGoogle size={28} />}
    </OauthWrapper>
  );
};
