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

export const Spacer = styled.div`
  flex: 1;
`;

//

export const BigLiveCardContainer = styled.div`
  padding: 22px;
  height: 340px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 35px;
  background-color: ${({theme}) => theme.colors.text.subtitle};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CategoryTitle = styled.span`
  font-size: ${({theme}) => theme.font.xLarge};
  font-weight: 600;
  color: ${({theme}) => theme.colors.common.white};
`

export const BigThumbnail = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

export const BigInfoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  align-items: center;
`;

export const BigProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 12px;
`;

export const BigTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BigLiveTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: white;
`;

export const BigStreamerName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
