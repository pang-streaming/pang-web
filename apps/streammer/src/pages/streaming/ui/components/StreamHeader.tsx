import React from 'react';
import styled from 'styled-components';

interface StreamHeaderProps {
  title: string;
  viewerCount: number;
  likeCount: number;
  isStreaming: boolean;
  onEditTitle: () => void;
  onStartStream: () => void;
  onStopStream: () => void;
  onTagClick: () => void;
}

export const StreamHeader: React.FC<StreamHeaderProps> = ({
  title,
  viewerCount,
  likeCount,
  isStreaming,
  onEditTitle,
  onStartStream,
  onStopStream
}) => {
  return (
    <HeaderContainer>
      <TitleArea>
        <StreamTitle>
          {title}
          <EditButton onClick={onEditTitle} />
        </StreamTitle>
        <StatGroup>
          <ViewerCount><EyeIcon />{viewerCount}</ViewerCount>
          <LikeCount><HeartIcon />{likeCount}</LikeCount>
        </StatGroup>
      </TitleArea>
      <ControlButtons>
        <PlayButton onClick={isStreaming ? onStopStream : onStartStream}>
          <PlayIcon />
        </PlayButton>
      </ControlButtons>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StreamTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EditButton = styled.button`
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/%3E%3Cpath fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'/%3E%3C/svg%3E");
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;

const StatGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

const ViewerCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.common.white};
`;

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.common.white};
`;

const EyeIcon = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z'/%3E%3Cpath d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
`;

const HeartIcon = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M8 6.236l-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const PlayButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.content.light};
  }
`;

const PlayIcon = styled.div`
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='${({ theme }) => encodeURIComponent(theme.colors.common.white)}' viewBox='0 0 16 16'%3E%3Cpath d='M6 10.117V5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43'/%3E%3Cpath d='M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
`;

export default StreamHeader;
