import styled from "styled-components";

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(365px, 1fr));
    gap: 12px; 
    justify-content: center;
    width: 100%;
    max-width: 100%;
    padding: 16px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr)); 
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

