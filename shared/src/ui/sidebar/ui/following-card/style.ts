import styled from "styled-components";

export const Container = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "200px" : "40px")};
  height: 40px;
  padding: ${({ isSidebarOpen }) => (isSidebarOpen ? "0 12px" : "0")};
  border-radius: ${({ theme }) => theme.borders.large};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.light};
  }
`;

export const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  flex-shrink: 0;

  background-image: 
    linear-gradient(white, white),  
    linear-gradient(to top, #6800FD, #FD0156); 
    
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

export const Nickname = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;
