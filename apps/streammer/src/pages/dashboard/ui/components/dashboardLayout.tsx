import React from 'react';
import styled from 'styled-components';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <DashboardContainer>
      {children}
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "recent notices"
    "stats community"
    "upload community";
  gap: 20px;
  padding: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "recent"
      "stats"
      "notices"
      "upload"
      "community";
  }
`;
