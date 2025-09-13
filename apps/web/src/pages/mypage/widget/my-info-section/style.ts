import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
`;

export const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;

export const UserInfoSection = styled.div`
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Nickname = styled.span`
  font-size: ${({ theme }) => theme.font.xxLarge};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.normal};
`;

export const Email = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: #737373;
`;

export const StatusMessage = styled.span`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;
