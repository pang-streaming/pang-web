import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

export const LeftSection = styled.div`
  padding: 0 71px;
  width: 600px;
  height: 100vh;
  background-color: #171717;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 0 40px 40px 0;
`;

export const RightSection = styled.div`
  flex-grow: 1;
  height: 100vh;
  background-image: url('/src/app/assets/login-banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
`;

export const BannerContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 0;
  transform: translateY(-50%);
  height: 150px;
  display: flex;
  animation: slideRight 185s linear infinite;
  
  @keyframes slideRight {
    0% {
      transform: translateY(-80%) translateX(-90%);
    }
    100% {
      transform: translateY(-80%) translateX(100%);
    }
  }
`;

export const BannerImage = styled.img`
  height: 250px;
  width: auto;
  flex-shrink: 0;
  margin-right: 10px;
  opacity: 0.4;
`;

export const BannerContainer2 = styled.div`
  position: absolute;
  top: 70%;
  right: 0;
  transform: translateY(-50%);
  height: 150px;
  display: flex;
  animation: slideLeft 180s linear infinite;
  
  @keyframes slideLeft {
    0% {
      transform: translateY(-70%) translateX(90%);
    }
    100% {
      transform: translateY(-70%) translateX(-100%);
    }
  }
`;

export const BannerImage2 = styled.img`
  height: 250px;
  width: auto;
  flex-shrink: 0;
  margin-left: 10px;
  opacity: 0.4;
`;

export const LoginLogo = styled.img`
  width: 200px;
  margin-bottom: 108px;
`;

export const LoginInputContainer = styled.div`
  width: 90%;
  height: 50px;
  border-radius: 8px;
  background-color: #262626;
  display: flex;
  margin-bottom: 14px;
`;

export const LoginInputIcon = styled.div`
  width: 20px;
  height: 20px;
`;

export const LoginInputRight = styled.input`
  padding-left: 22px;
  width: 80%;
  height: 95%;
  outline: none;
  border: none;
  background-color: #262626;
  border-radius: 8px;
  color: #fff;
`;

export const LoginInputLeft = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SectionDivider = styled.div`
  width: 1px;
height: 100%;
  background-color: #737373;
`;

export const LoginButton = styled.button<{ $isActive: boolean }>`
  margin-top: 21px;
  margin-bottom: 47px;
  width: 90%;
  height: 50px;
  border-radius: 8px;
  background-color: ${({ $isActive }) => ($isActive ? "#e03456" : "#404040")};
  color: ${({ $isActive }) => ($isActive ? "white" : "#999")};
  outline: none;
  border: none;
  cursor: ${({ $isActive }) => ($isActive ? "pointer" : "default")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? "#c92e4a" : "#404040")};
  }
`;

export const LoginButtonText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const SignUpText = styled.p`
  font-size: 14px;
  color: #b3b3b3;
  text-align: center;
`;

export const SignUpLink = styled.span`
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  margin-left: 4px;
  text-decoration: underline;

  &:hover {
    color: #FF0055;
  }
`;

export const LoginDividerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LoginDividerContainer = styled.div`
  height: 1px;
  background-color: #737373;
  flex: 1;
`;

export const DividerText = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: #737373;
`;

export const OauthWrapper = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 8px;
  background-color: #262626;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OauthContainer = styled.div`
  margin-top: 21px;
  display: flex;
  gap: 15px;
`;