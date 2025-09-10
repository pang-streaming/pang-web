import styled from "styled-components";

export const FollowButton = () => {
    return (
        <Container>
            <Text>팔로우</Text>
        </Container>
    );
}

const Container = styled.button`
  padding: 0 12px;
  height: 31px;
  border-radius: 12px;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.secondary.normal};
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  flex-shrink: 0;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.common.white};
  flex-shrink: 0;
`;