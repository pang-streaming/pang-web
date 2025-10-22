import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "@pang/shared/ui";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <ContentWrapper>
        <ErrorCode>404</ErrorCode>
        <Title>페이지를 찾을 수 없습니다</Title>
        <Description>
          요청하신 페이지가 존재하지 않거나<br />
          이동되었을 수 있습니다.
        </Description>
        <ButtonWrapper>
          <SubmitButton onClick={handleGoHome}>
            홈으로 돌아가기
          </SubmitButton>
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const ErrorCode = styled.div`
  font-size: 120px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary.normal};
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 16px;
  line-height: 1.3;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text.subtitle};
  line-height: 1.6;
  margin-bottom: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
