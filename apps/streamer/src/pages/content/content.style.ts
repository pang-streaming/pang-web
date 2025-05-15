import styled from 'styled-components';
import { colors, spacing, fontSizes, borderRadius } from '../../styles/theme';
import { PageContainer } from '../../styles/common';

export const ContentContainer = styled(PageContainer)`
  padding: ${spacing.lg};
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${spacing.lg} ${spacing.sm} ${spacing.lg};
  margin-bottom: ${spacing.lg};
  border-bottom: 1px solid ${colors.border.primary};
  
  button {
    background: none;
    border: none;
    color: ${colors.text.secondary};
    font-size: ${fontSizes.lg};
    padding: ${spacing.sm} 0;
    margin-right: ${spacing.lg};
    cursor: pointer;
    position: relative;
    
    &.active {
      color: ${colors.accent.primary};
      
      &:after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${colors.accent.primary};
      }
    }
    
    &:hover {
      color: ${colors.accent.primary};
    }
  }
`;

export const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const ContentItem = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr auto;
  gap: ${spacing.lg};
  padding: ${spacing.lg};
  background-color: ${colors.background.secondary};
  margin-bottom: ${spacing.sm};
  align-items: center;
`;

export const Thumbnail = styled.div`
  width: 240px;
  height: 135px;
  background-color: ${colors.background.tertiary};
  border-radius: ${borderRadius.sm};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  text-align: left;
  
  h3 {
    font-size: ${fontSizes.xl};
    font-weight: 500;
    margin: 0;
  }
  
  .date {
    font-size: ${fontSizes.md};
    color: ${colors.text.secondary};
  }
  
  .views {
    font-size: ${fontSizes.md};
    color: ${colors.text.secondary};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const ActionButton = styled.button<{ variant?: 'danger' | 'primary' }>`
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.sm};
  border: none;
  font-size: ${fontSizes.md};
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  
  background-color: ${props => 
    props.variant === 'danger' ? colors.background.tertiary : 
    props.variant === 'primary' ? colors.accent.primary : colors.background.tertiary};
  
  color: ${props => 
    props.variant === 'danger' ? '#ff4d4f' : colors.text.primary};
  
  &:hover {
    background-color: ${props => 
    props.variant === 'danger' ? '#3A2A2A' : 
    props.variant === 'primary' ? colors.accent.primaryHover : '#3A3A3A'};
  }
`;

export const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background-color: transparent;
  color: ${colors.text.primary};
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: ${spacing.lg};
  font-size: ${fontSizes.md};
  
  svg {
    margin-right: ${spacing.xs};
  }
  
  &:hover {
    color: ${colors.accent.primary};
  }
`;
