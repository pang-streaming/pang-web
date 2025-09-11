import styled from "styled-components";

export const CategoryBoxThumbnail = styled.div`
	width: 100%;
	height: 280px;
	background-color: ${({theme}) => theme.colors.content.normal};
	border-radius: 10px;
	margin-bottom: 10px;
`;

export const CategoryContainer = styled.div`
	width: 205px;
	height: 335px;
	border-radius: 10px;
	background-color: transparent;
	display: flex;
	flex-direction: column;
	&:hover {
		border: 3px solid ${({theme}) => theme.colors.primary.normal};
		box-sizing: border-box;
	}
`;

export const CategoryInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const CategoryChip = styled.div`
	margin: 10px;
	width: 59px;
	height: 20px;
	background-color: ${({theme}) => theme.colors.secondary.normal};
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ChipCountText = styled.span`
	font-size: 10px;
	font-weight: 500;
	color: ${({theme}) => theme.colors.common.white};
`;
export const CategoryBoxTitle = styled.span`
	font-size: ${({theme}) => theme.font.xLarge};
	font-weight: 700;
	color: ${({theme}) => theme.colors.text.normal};
`;
export const LiveCountText = styled.span`
	font-size: ${({theme}) => theme.font.medium};
	font-weight: 500;
	color: ${({theme}) => theme.colors.text.subtitle};
`;
