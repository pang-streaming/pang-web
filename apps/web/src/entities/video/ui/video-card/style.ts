import styled from "styled-components";

export const LiveCardContainer = styled.div`
  width: 100%;
  height: 313px;
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 204px;
  border-radius: 20px;
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 8px;
  margin-bottom: 7px;
`;

export const EmptyText = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.text.subtitle};
  border-radius: 12px;
  margin-bottom: 10px;
`;

export const LiveTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

export const StreamerName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #737373;
`;

export const LiveInfo = styled.div`
  display: flex;
`;

export const TitleContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;