import styled from 'styled-components';
import { colors, spacing, fontSizes, borderRadius } from './theme';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.background.primary};
  color: ${colors.text.primary};
  padding: ${spacing.lg};
`;

export const Section = styled.section`
  background-color: ${colors.background.secondary};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.lg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${spacing.lg} ${spacing.sm} ${spacing.lg};
  margin-bottom: ${spacing.lg};
  border-bottom: 1px solid ${colors.border.primary};
  
  h1, h2 {
    font-size: ${fontSizes.xl};
    margin-right: ${spacing.xl};
    color: ${colors.accent.primary};
    font-weight: 500;
  }
`;

export const TabButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? colors.accent.primary : colors.text.secondary};
  font-size: ${fontSizes.lg};
  padding: ${spacing.sm} 0;
  margin-right: ${spacing.lg};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.active ? colors.accent.primary : 'transparent'};
  }
  
  &:hover {
    color: ${colors.accent.primary};
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: ${spacing.lg};
`;

export const Card = styled.div`
  background-color: ${colors.background.tertiary};
  border-radius: ${borderRadius.sm};
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

interface ButtonProps {
  primary?: boolean;
  danger?: boolean;
}

export const Button = styled.button<ButtonProps>`
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
    props.danger ? colors.background.tertiary : 
    props.primary ? colors.accent.primary : colors.background.tertiary};
  
  color: ${props => 
    props.danger ? '#ff4d4f' : colors.text.primary};
  
  &:hover {
    background-color: ${props => 
    props.danger ? '#3A2A2A' : 
    props.primary ? colors.accent.primaryHover : '#3A3A3A'};
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xs};
  border-radius: 50%;
  
  &:hover {
    color: ${colors.text.primary};
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Input = styled.input`
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.background.secondary};
  border: 1px solid ${colors.border.primary};
  border-radius: ${borderRadius.sm};
  color: ${colors.text.primary};
  font-size: ${fontSizes.md};
  
  &:focus {
    outline: none;
    border-color: ${colors.accent.primary};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  
  label {
    color: ${colors.text.secondary};
    font-size: ${fontSizes.md};
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  width: 100%;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.background.secondary};
  border-radius: ${borderRadius.sm};
`;

export const Label = styled.span`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
`;

export const Value = styled.span`
  font-size: ${fontSizes.md};
  font-weight: 500;
  color: ${colors.text.primary};
`;

export const Flex = styled.div<{
  direction?: 'row' | 'column',
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch',
  gap?: string,
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  gap: ${props => props.gap || spacing.md};
`;
