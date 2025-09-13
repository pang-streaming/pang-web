import styled from "styled-components";



export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 8px 0 12px;
`;

export const CategoryGrid = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  @media(max-width: ${({theme}) => theme.breakpoint.tablet}) {
    margin-bottom: 20px;
  }
`;

export const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 24px;

  border-radius: 12px;
  background-color: #1e1e1e;

  @media(max-width: ${({theme}) => theme.breakpoint.mobile}) {
    margin-bottom: 20px;
  }
`;

export const TagGrid = styled.div`
  display: flex;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 12px;

  @media(max-width: ${({theme}) => theme.breakpoint.mobile}) {
    margin-bottom: 20px;
  }
`;
