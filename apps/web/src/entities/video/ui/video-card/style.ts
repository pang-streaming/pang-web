import styled from "styled-components";

export const LiveCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
	gap: 12px;
`;

export const VideoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	aspect-ratio: 16 / 9;
	border-radius: ${({theme}) => theme.borders.xlarge};
	background-color: ${({theme}) => theme.colors.text.subtitle};
`

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 8px;
  margin-bottom: 7px;
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