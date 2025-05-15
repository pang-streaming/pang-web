import styled from "styled-components";
import { colors, spacing, fontSizes, borderRadius, shadows } from '../../styles/theme';

export const DashboardContainer = styled.div`
  display: grid;
  gap: ${spacing.lg};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 220px);
  padding: ${spacing.lg};
  
  > *:nth-child(1) { grid-row: 1; grid-column: 1; }
  > *:nth-child(2) { grid-row: 2; grid-column: 1; }
  > *:nth-child(3) { grid-row: 3; grid-column: 1; }
  > *:nth-child(4) { grid-row: 1; grid-column: 2; }
  > *:nth-child(5) { grid-row: 2 / 4; grid-column: 2; height: 420px; }
`;

export const Section = styled.section`
  background: ${colors.background.secondary};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.lg};
  height: 180px;
  overflow-y: auto;
  box-shadow: ${shadows.md};

  h2 {
    text-align: left;
    margin: 0 0 ${spacing.lg} 0;
    font-size: ${fontSizes.xl};
    font-weight: 700;
    color: ${colors.text.primary};
  }
`;

export const RecentLiveSection = styled(Section)`
  margin-bottom: ${spacing.lg};
  .live-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${spacing.sm} 0;
    
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.border.secondary};
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: ${spacing.xs};
      text-align: left;
      color: ${colors.text.primary};
      
      > div {
        text-align: left;
      }
      
      .date {
        text-align: left;
      }
    }

    .date {
      color: ${colors.text.tertiary};
      font-size: ${fontSizes.sm};
    }

    button {
      background: ${colors.accent.primary};
      color: ${colors.text.primary};
      border: none;
      padding: ${spacing.xs} ${spacing.sm};
      border-radius: ${borderRadius.sm};
      cursor: pointer;
      font-size: ${fontSizes.sm};
      
      &:hover {
        background: ${colors.accent.primaryHover};
      }
    }
  }
`;

export const StatsSection = styled(Section)`
  margin-bottom: ${spacing.lg};
  .stat-box {
    text-align: left;
    padding: ${spacing.lg};
    background: ${colors.background.tertiary};
    border-radius: ${borderRadius.lg};

    .number {
      font-size: ${fontSizes.xxl};
      font-weight: 700;
      margin-bottom: ${spacing.sm};
      text-align: left;
      color: ${colors.text.primary};
    }

    .label {
      font-size: ${fontSizes.md};
      color: ${colors.text.tertiary};
      margin-bottom: ${spacing.sm};
      text-align: left;
    }

    .change {
      font-size: ${fontSizes.md};
      color: #00FF00;
      text-align: left;
    }
  }
`;

export const UploadSection = styled(Section)`
  .upload-box {
    border: 1px dashed ${colors.text.tertiary};
    border-radius: ${borderRadius.lg};
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: ${fontSizes.md};
    color: ${colors.text.secondary};
    transition: all 0.2s ease;
    
    &:hover {
      border-color: ${colors.accent.primary};
      color: ${colors.accent.primary};
    }
  }
`;

export const NoticeSection = styled(Section)`
  margin-bottom: ${spacing.lg};
  .notice-item {
    padding: ${spacing.sm} 0;
    text-align: left;
    color: ${colors.text.primary};
    
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.border.secondary};
    }

    > div:first-child {
      margin-bottom: ${spacing.xs};
      text-align: left;
    }

    .date {
      color: ${colors.text.tertiary};
      font-size: ${fontSizes.sm};
      text-align: left;
    }
  }
`;

export const PangCommuSection = styled(Section)`
  .pangryu-item {
    padding: ${spacing.sm} 0;
    text-align: left;
    color: ${colors.text.primary};
    
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.border.secondary};
    }

    > div:first-child {
      margin-bottom: ${spacing.xs};
      text-align: left;
    }

    .date {
      color: ${colors.text.tertiary};
      font-size: ${fontSizes.sm};
      text-align: left;
    }
  }
`;
