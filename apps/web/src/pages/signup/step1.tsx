import {
    HeaderWrap,
    NextButton,
    SignupBox,
    SignupBoxAllAccessBox,
    SignupBoxAllAccessBoxText,
    SignupBoxDetailAccessContainer,
    SignupBoxDetailAccessContainerText,
    SignupBoxElemContainer,
    SignupBoxTitle,
    SignUpContainer,
    SignupWrap,
    CheckboxLabel,
    Checkbox,
    CustomCheckbox,
    NextButtonWrapper,
  } from "../signup.style";
  
  import logo from "../../assets/logo.svg";
  import { useNavigate } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { StepDots } from "./stepDots";
  
  export const Step1 = () => {
    const navigate = useNavigate();
  
    const [allChecked, setAllChecked] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
  
    useEffect(() => {
      setAllChecked(termsChecked && privacyChecked);
    }, [termsChecked, privacyChecked]);
  
    const handleAllCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setAllChecked(checked);
      setTermsChecked(checked);
      setPrivacyChecked(checked);
    };
  
    const handleClick = () => {
      if (termsChecked && privacyChecked) {
        navigate("/signup/step2");
      }
    };
  
    return (
      <SignUpContainer>
        <HeaderWrap>
          <img src={logo} />
        </HeaderWrap>
        <SignupWrap>
          <SignupBox>
            <SignupBoxElemContainer>
              {/* 고정 제목 */}
              <SignupBoxTitle>
                PANG 서비스 약관에
                <br />
                동의해주세요.
              </SignupBoxTitle>
  
              {/* 중간 컨텐츠 */}
              <div style={{ flex: 1 }}>
                <SignupBoxAllAccessBox>
                  <CheckboxLabel>
                    <Checkbox
                        id="all-access-checkbox"
                        checked={allChecked}
                        onChange={handleAllCheckedChange}
                    />
                    <CustomCheckbox className="custom-checkbox" />
                    <SignupBoxAllAccessBoxText>
                      약관 전체 동의
                    </SignupBoxAllAccessBoxText>
                  </CheckboxLabel>
                </SignupBoxAllAccessBox>
  
                <SignupBoxDetailAccessContainer>
                  <div>
                    <CheckboxLabel>
                      <Checkbox
                          id="terms-checkbox"
                          checked={termsChecked}
                          onChange={(e) => setTermsChecked(e.target.checked)}
                      />
                      <CustomCheckbox className="custom-checkbox" />
                      <SignupBoxDetailAccessContainerText>
                        서비스 이용 약관에 동의
                      </SignupBoxDetailAccessContainerText>
                    </CheckboxLabel>
                  </div>
                  <div>
                    <CheckboxLabel>
                      <Checkbox
                          id="privacy-checkbox"
                          checked={privacyChecked}
                          onChange={(e) => setPrivacyChecked(e.target.checked)}
                      />
                      <CustomCheckbox className="custom-checkbox" />
                      <SignupBoxDetailAccessContainerText>
                        개인정보 수집 및 이용에 동의
                      </SignupBoxDetailAccessContainerText>
                    </CheckboxLabel>
                  </div>
                </SignupBoxDetailAccessContainer>
              </div>
  
              {/* 고정 버튼 */}
              <NextButtonWrapper>
                <NextButton
                  onClick={handleClick}
                  disabled={!(termsChecked && privacyChecked)}
                  $active={termsChecked && privacyChecked}
                >
                  다음 →
                </NextButton>
              </NextButtonWrapper>
              
              {/* 고정 인디케이터 */}
              <div style={{ marginTop: "24px", textAlign: "center" }}>
                <StepDots activeStep={1} />
              </div>
            </SignupBoxElemContainer>
          </SignupBox>
        </SignupWrap>
      </SignUpContainer>
    );
  };
  