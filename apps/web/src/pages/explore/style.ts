import styled from "styled-components";


export const ExploreContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;


export const SegmentHeader = styled.div`
  box-sizing: border-box;
	position: sticky;
  top: 67px;
  background-color: ${({theme}) => theme.colors.background.normal};
  z-index: 1;
  display: flex;
	flex-direction: row;
  align-items: center;
`;

export const Container = styled.div`
	width: 100%;
	display: flex;
	gap: 20px;
	flex-direction: column;
`;

export const Title = styled.span`
	font-size: ${({ theme }) => theme.font.xxLarge};
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text.normal};
`;


export const VideoListContainer = styled.div`
	display: grid;
    gap: 20px;
    width: 100%;

    grid-template-columns: repeat(1, 1fr);

    @media (min-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1600px) {
        grid-template-columns: repeat(4, 1fr);
    }
	
	@media (min-width: 1900px) {
		grid-template-columns: repeat(5, 1fr);
	}
	
    @media (min-width: 2090px) {
        grid-template-columns: repeat(6, 1fr);
    }
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
