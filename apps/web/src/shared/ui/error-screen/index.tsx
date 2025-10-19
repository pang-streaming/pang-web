import styled from "styled-components";

export const ErrorScreen = ({error}:{error: string}) => {
    return (
        <Container>
		  <ErrorStateContainer>
			<ErrorStateTitle>오류가 발생했습니다</ErrorStateTitle>
			<ErrorStateMessage>{error}</ErrorStateMessage>
		  </ErrorStateContainer>
		</Container>
    )
}

export const Container = styled.div`
	width: 100%;
	display: flex;
	gap: 20px;
	flex-direction: column;
`;


export const ErrorStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 400px;
`;

export const ErrorStateTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  margin-bottom: 12px;
`;

export const ErrorStateMessage = styled.p`
  font-size: ${({ theme }) => theme.font.large};
  color: ${({ theme }) => theme.colors.text.placeholder};
  margin: 0;
`;