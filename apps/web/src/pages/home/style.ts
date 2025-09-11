import styled from "styled-components";

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


export const LiveListContainer = styled.div`
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
`;
