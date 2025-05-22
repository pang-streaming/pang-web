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


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isActive = username.trim() !== "" && password.trim() !== "";

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <LoginButton disabled={!isActive} isActive={isActive}>
          <LoginButtonText>로그인</LoginButtonText>
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
