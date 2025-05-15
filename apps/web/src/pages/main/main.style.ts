import styled from "styled-components";

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 365px);
    gap: 12px; 
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    max-width: 100%;

    @media (max-width: 1400px) {
        grid-template-columns: repeat(3, 365px);
    }

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 365px); 
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(3, 365px);
    }
`;

