import styled from "styled-components";

export const FallBack = () => {
  return (
    <Loading>
      <p>로딩 중...</p>
    </Loading>
  );
};

export const Loading = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.text.normal};
`;
