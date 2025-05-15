import {
    HeaderWrap,
    NextButton,
    SignupBox,
    SignupBoxElemContainer,
    SignupWrap,
    SignUpContainer,
    SignupBoxTitle,
    EmailInputWrapper,
    EmailInput,
    SendButton,
    HintText,
    NextButtonWrapper,
  } from "../signup.style";
  
  import logo from "../../assets/logo.svg";
  import { useNavigate } from "react-router-dom";
  import { StepDots } from "./stepDots";
  import { useState } from "react";
  import { FiUser } from "react-icons/fi";
  import { MdCheck } from "react-icons/md";
  // import { IoIosSend } from "react-icons/io";
  
  export const Step3 = () => {
    const navigate = useNavigate();
  
    const [id, setId] = useState("");
    const [isChecked, setIsChecked] = useState(false);
  
    const handleDuplicateCheck = () => {
      if (id.length >= 4) {
        setIsChecked(true);
      } else {
        alert("아이디는 최소 4자 이상이어야 합니다.");
        setIsChecked(false);
      }
    };
  
    const handleNextClick = () => {
      if (isChecked) {
        navigate("/signup/step4");
      } else {
        alert("아이디 중복 체크를 완료해주세요.");
      }
    };
  
    return (
      <SignUpContainer>
        <HeaderWrap>
          <img src={logo} alt="logo" />
        </HeaderWrap>
  
        <SignupWrap>
          <SignupBox>
            <SignupBoxElemContainer>
              <SignupBoxTitle>
                아이디 입력한 후,
                <br />
                아이디 중복 체크를 진행해주세요
              </SignupBoxTitle>
              {/* 중간 컨텐츠 영역 */}
              <div style={{ flex: 1 }}>
                <EmailInputWrapper>
                  <FiUser size={20} color="#999" />
                  <EmailInput
                    placeholder="아이디를 입력해주세요"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  <SendButton disabled={!id} onClick={handleDuplicateCheck}>
                    <MdCheck size={24} />
                  </SendButton>
                </EmailInputWrapper>
  
                <HintText>
                  아이디 중복 체크 버튼을 눌러 중복 체크를 진행해주세요.
                </HintText>
              </div>
              {/* 고정 버튼 */}
              <NextButtonWrapper>
                <NextButton
                  onClick={handleNextClick}
                  disabled={!isChecked}
                  $active={isChecked}
                >
                  다음 →
                </NextButton>
              </NextButtonWrapper>
              
              {/* Step Dots */}
              <div style={{ marginTop: "24px", textAlign: "center" }}>
                <StepDots activeStep={3} />
              </div>
            </SignupBoxElemContainer>
          </SignupBox>
        </SignupWrap>
      </SignUpContainer>
    );
  };
  