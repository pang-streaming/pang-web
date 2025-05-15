import styled from 'styled-components';
import { colors, spacing, fontSizes, borderRadius, shadows } from '../../styles/theme';

export const StreamingContainer = styled.div`
  width: 100%;
  background: ${colors.background.secondary};
  color: ${colors.text.primary};
  display: flex;
  flex-direction: column;
`;

export const StreamingViewContainer = styled.div`
  flex: 1;
  display: flex;
`;

export const StreamSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${colors.background.dark};
  position: relative;
`;

export const StreamContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const MainView = styled.div`
  width: 663px;
  height: 373px;
  background: ${colors.background.dark};
  position: relative;
`;

export const ControlPanel = styled.div`
  display: flex;
  padding: ${spacing.sm} ${spacing.lg};
  background: ${colors.background.primary};
  border-bottom: 1px solid ${colors.border.secondary};
  align-items: center;
  gap: ${spacing.md};
`;

export const StreamControls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.sm};
  padding: 0 ${spacing.sm};

  .left-controls {
    display: flex;
    gap: ${spacing.sm};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const MixerContainer = styled.div`
  background: ${colors.background.primary};
  padding: ${spacing.md};
  display: grid;
  grid-template-columns: 180px 1fr 350px;
  gap: ${spacing.md};
  border-top: 1px solid ${colors.border.secondary};
`;

export const SceneList = styled.div`
  background: ${colors.background.tertiary};
  border-radius: ${borderRadius.sm};
  padding: ${spacing.sm};
  height: 140px;
  overflow-y: auto;
  text-align: left;

  h3 {
    margin: 0 0 ${spacing.sm} 0;
    font-size: ${fontSizes.sm};
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.text.secondary};
    padding-bottom: ${spacing.sm};
    border-bottom: 1px solid ${colors.border.primary};

    button {
      background: none;
      border: none;
      color: ${colors.text.primary};
      cursor: pointer;
      font-size: ${fontSizes.md};
      padding: ${spacing.xs};

      &:hover {
        color: ${colors.accent.primary};
      }
    }
  }
`;

export const Scene = styled.div`
  padding: ${spacing.sm} ${spacing.sm};
  background: ${colors.background.secondary};
  border-radius: ${borderRadius.sm};
  margin-bottom: ${spacing.xs};
  cursor: pointer;
  font-size: ${fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};

  svg {
    width: 14px;
    height: 14px;
    opacity: 0.7;
  }

  &:hover {
    background: #3A3A3A;
  }

  &.active {
    background: ${colors.accent.primary};
    
    svg {
      opacity: 1;
    }
  }
`;

export const SourceList = styled.div`
  background: ${colors.background.tertiary};
  border-radius: ${borderRadius.sm};
  padding: ${spacing.sm};
  height: 140px;
  overflow-y: auto;
  text-align: left;

  h3 {
    margin: 0 0 ${spacing.sm} 0;
    font-size: ${fontSizes.sm};
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.text.secondary};
    padding-bottom: ${spacing.sm};
    border-bottom: 1px solid ${colors.border.primary};
  }
`;

export const VolumeContainer = styled.div`
  background: ${colors.background.tertiary};
  border-radius: ${borderRadius.sm};
  padding: ${spacing.sm};
  height: 140px;
  display: flex;
  flex-direction: column;
  
  h3 {
    margin: 0 0 ${spacing.md} 0;
    font-size: ${fontSizes.sm};
    color: ${colors.text.secondary};
    padding-bottom: ${spacing.sm};
    border-bottom: 1px solid ${colors.border.primary};
  }
`;

export const VolumeSection = styled.div`
  margin-bottom: ${spacing.md};
  text-align: left;
  
  .volume-label {
    font-size: ${fontSizes.xs};
    color: ${colors.text.secondary};
    margin-bottom: ${spacing.xs};
    text-align: left;
  }
  
  .volume-meter {
    height: 18px;
    position: relative;
    margin-bottom: ${spacing.xs};
    display: flex;
    align-items: center;
    
    .volume-scale {
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: absolute;
      top: -15px;
      font-size: ${fontSizes.xs};
      color: ${colors.text.tertiary};
    }
    
    .volume-bar {
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #00FF00, #FFFF00, #FF0000);
      position: relative;
    }
    
    .volume-thumb {
      width: 10px;
      height: 10px;
      background: ${colors.text.primary};
      border-radius: 50%;
      position: absolute;
      top: -4px;
      cursor: pointer;
    }
  }
`;

export const Source = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.sm};
  background: ${colors.background.secondary};
  border-radius: ${borderRadius.sm};
  margin-bottom: ${spacing.xs};
  font-size: ${fontSizes.sm};

  span {
    display: flex;
    align-items: center;
    gap: ${spacing.xs};
  }

  .volume-control {
    width: 80px;
    height: 3px;
    background: #3A3A3A;
    border-radius: 2px;
    position: relative;
    cursor: pointer;

    .volume-level {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: #FF1B6D;
      border-radius: 2px;
    }
  }
`;

export const ChatContainer = styled.div`
  width: 300px;
  background: ${colors.background.primary};
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${colors.background.primary};
  color: ${colors.text.primary};
  
  .chat-header {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background: #1A1A1A;
    border-bottom: 1px solid #2A2A2A;
    text-align: left;
    
    svg {
      margin-right: 10px;
      cursor: pointer;
    }
    
    span {
      font-size: 16px;
      font-weight: 500;
      text-align: left;
    }
  }
  
  .chat-leaderboard {
    background: #1E1E1E;
    padding: 12px;
    margin: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    
    .leaderboard-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      
      .rank {
        width: 25px;
        height: 25px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        margin-bottom: 5px;
      }
      
      .name {
        font-size: 12px;
        margin-bottom: 2px;
        text-align: left;
      }
      
      .points {
        font-size: 10px;
        color: #999;
        text-align: left;
      }
    }
  }
  
  .stream-info {
    padding: 0 15px;
    margin-bottom: 15px;
    text-align: left;
    
    .stream-title {
      color: #A15EFF;
      font-size: 13px;
      margin-bottom: 5px;
      text-align: left;
    }
    
    .stream-subtitle {
      color: #FF1B6D;
      font-size: 13px;
      text-align: left;
    }
  }
  
  .chat-input {
    margin-top: auto;
    padding: 10px;
    display: flex;
    align-items: center;
    background: #1E1E1E;
    border-top: 1px solid #2A2A2A;
    
    input {
      flex: 1;
      padding: 8px 12px;
      background: #1A1A1A;
      border: 1px solid #2A2A2A;
      border-radius: 20px;
      color: white;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: #FF1B6D;
      }
    }
    
    .input-controls {
      display: flex;
      align-items: center;
      margin-left: 10px;
      
      svg {
        margin-right: 10px;
        cursor: pointer;
        color: #999;
        
        &:hover {
          color: white;
        }
      }
      
      button {
        width: 32px;
        height: 32px;
        background: #FF1B6D;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        
        &:hover {
          background: #FF0058;
        }
      }
    }
  }
  
  .chat-footer {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    text-align: left;
    
    input[type="checkbox"] {
      margin-right: 8px;
    }
    
    label {
      font-size: 12px;
      color: #999;
      text-align: left;
    }
  }
`;

export const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  padding: ${spacing.sm};
  min-height: 0;
  margin-bottom: auto;
`;

export const ChatItem = styled.div`
  display: flex;
  margin-bottom: ${spacing.sm};
  padding: ${spacing.xs} 0;
  
  .chat-message {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: ${spacing.xs};
    text-align: left;
    
    svg {
      margin-right: ${spacing.xs};
      margin-top: ${spacing.xs};
    }
    
    .username {
      font-size: ${fontSizes.sm};
      font-weight: 600;
      color: ${colors.accent.golden};
      margin-right: ${spacing.xs};
      text-align: left;
    }
    
    .message {
      font-size: ${fontSizes.sm};
      color: ${colors.text.primary};
      text-align: left;
    }
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

interface ControlButtonProps {
  $primary?: boolean;
}

export const ControlButton = styled.button<ControlButtonProps>`
  padding: ${spacing.sm} ${spacing.md};
  background: ${props => props.$primary ? colors.accent.primary : colors.background.tertiary};
  border: none;
  border-radius: ${borderRadius.sm};
  color: ${colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${fontSizes.sm};
  box-shadow: ${shadows.sm};

  &:hover {
    background: ${props => props.$primary ? colors.accent.primaryHover : '#3A3A3A'};
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 10px;
  color: #999;
  align-items: center;
  margin-left: auto;
`;

export const StreamingSettingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.lg};
  margin-top: ${spacing.lg};
`;

export const SettingsSection = styled.div`
  background: ${colors.background.tertiary};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.lg};
  box-shadow: ${shadows.md};
  text-align: left;

  h2 {
    font-size: ${fontSizes.xl};
    margin: 0 0 ${spacing.lg} 0;
  }
`;

export const SettingsForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  text-align: left;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  text-align: left;

  label {
    color: ${colors.text.secondary};
    font-size: ${fontSizes.md};
    text-align: left;
  }

  input, select {
    padding: ${spacing.sm} ${spacing.sm};
    background: ${colors.background.secondary};
    border: 1px solid ${colors.border.primary};
    border-radius: ${borderRadius.sm};
    color: ${colors.text.primary};
    font-size: ${fontSizes.md};

    &:focus {
      outline: none;
      border-color: ${colors.accent.primary};
    }
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

export const Tag = styled.div`
  background: ${colors.background.secondary};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};

  button {
    background: none;
    border: none;
    color: ${colors.text.secondary};
    cursor: pointer;
    padding: 0;
    font-size: ${fontSizes.md};
    display: flex;
    align-items: center;
  }
`;

export const DeviceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const DeviceItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm};
  background: ${colors.background.secondary};
  border-radius: ${borderRadius.sm};

  input[type="radio"] {
    margin: 0;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.md};
`;

export const StatItem = styled.div`
  background: ${colors.background.secondary};
  padding: ${spacing.sm};
  border-radius: ${borderRadius.sm};
  text-align: left;
  
  .label {
    color: ${colors.text.secondary};
    font-size: ${fontSizes.sm};
    margin-bottom: ${spacing.xs};
    text-align: left;
  }
  
  .value {
    font-size: ${fontSizes.lg};
    font-weight: 500;
    text-align: left;
  }
`;
