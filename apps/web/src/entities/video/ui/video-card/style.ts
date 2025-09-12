import styled from "styled-components";

export const LiveCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
	gap: 12px;
	&:hover {
		cursor: pointer;
	}
`;

export const VideoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	aspect-ratio: 16 / 9;
	border-radius: ${({theme}) => theme.borders.xlarge};
	background-color: ${({theme}) => theme.colors.content.dark};
	
	&:hover {
		opacity: 0.8;
	}
`

export const ProfileImage = styled.img`
	width: 50px;
	height: 50px;
	border-radius: ${({theme}) => theme.borders.maximum};
	margin-right: 8px;
margin-bottom: 7px;
`;

export const EmptyText = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.text.subtitle};
  color: ${({theme}) => theme.colors.common.white};
  border-radius: 12px;
  margin-bottom: 10px;
`;

export const LiveTitle = styled.span`
	font-size: ${({theme}) => theme.font.xLarge};
	font-weight: 600;
	color: ${({theme}) => theme.colors.text.normal};
`;

export const StreamerName = styled.span`
	font-size: ${({theme}) => theme.font.large};
	font-weight: 600;
	color: ${({theme}) => theme.colors.text.subtitle};
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