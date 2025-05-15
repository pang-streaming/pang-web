import styled from "styled-components";
import { colors, spacing, fontSizes, borderRadius, shadows } from '../../styles/theme';

export const RevenueContainer = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 300px);

  > *:nth-child(1) { grid-row: 1; grid-column: 1; margin-bottom: 0; }
  > *:nth-child(2) { grid-row: 1; grid-column: 2; margin-bottom: 0; }
  > *:nth-child(3) { grid-row: 2; grid-column: 1; margin-bottom: 0; }
  > *:nth-child(4) { grid-row: 2; grid-column: 2; margin-bottom: 0; }
`;




export const Section = styled.section`
  background-color: ${colors.background.secondary};
  border-radius: ${borderRadius.lg};
  padding: ${spacing.lg};
  box-shadow: ${shadows.md};
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;


export const SectionTitle = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: 600;
  color: ${colors.text.primary};
  text-align: left;
  margin-top: 0;
  margin-bottom: ${spacing.md};
`;

export const SubTitle = styled.h3`
  font-size: ${fontSizes.lg};
  font-weight: 500;
  color: ${colors.text.primary};
  text-align: left;
  margin-top: 0;
  margin-bottom: ${spacing.sm};
`;

export const RevenueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 0;
  flex: 1;
  padding-right: 20px;
`;

export const RevenueCard = styled.div<{ wide?: boolean }>`
  background-color: ${colors.background.tertiary};
  border-radius: ${borderRadius.md};
  padding: ${spacing.sm};
  display: flex;
  flex-direction: column;
  grid-column: ${props => props.wide ? 'span 3' : 'span 1'};
  width: 100%;
  height: fit-content;
`;

export const EmptyCard = styled.div`
  grid-column: span 3;
  height: 15px;
`;

export const RevenueLabel = styled.span`
  font-size: ${fontSizes.md};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.sm};
`;

export const RevenueLarge = styled.span`
  font-size: ${fontSizes.xxl};
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.xs};
`;

export const RevenueAmount = styled.span`
  font-size: ${fontSizes.xl};
  font-weight: 700;
  color: ${colors.text.primary};
`;

export const RevenueChange = styled.span<{ positive: boolean }>`
  font-size: 14px;
  color: ${props => props.positive ? '#ff4081' : '#4caf50'};
`;

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
  margin-top: 0;
  padding-right: 20px;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 20px;
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacing.sm};
  background-color: ${colors.background.tertiary};
  border-radius: ${borderRadius.md};
  align-items: center;

  &:not(:last-child) {
    margin-bottom: ${spacing.xs};
  }
`;

export const HistoryTitle = styled.span`
  font-weight: 500;
  color: ${colors.text.primary};
`;

export const HistoryDate = styled.span`
  color: ${colors.text.secondary};
  font-size: ${fontSizes.md};
`;

export const HistoryAmount = styled.span`
  font-weight: 600;
  color: ${colors.text.primary};
`;

export const HistoryDuration = styled.span`
  font-weight: 600;
  color: ${colors.text.primary};
`;

export const TierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 0;
`;

export const TierItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.xs} ${spacing.sm};
  background-color: ${colors.background.tertiary};
  border-radius: ${borderRadius.md};
  border-left: 4px solid ${colors.accent.primary};
`;

export const TierName = styled.span`
  font-weight: 500;
  color: ${colors.text.primary};
`;

export const TierPrice = styled.span`
  font-weight: 600;
  color: ${colors.text.primary};
  background-color: ${colors.accent.primary};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.sm};
`;

export const DonationSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background-color: #262626;
  border-radius: 4px;
`;

export const SettingLabel = styled.span`
  font-weight: 500;
  color: white;
`;

export const SettingValue = styled.span`
  font-weight: 600;
  color: white;
`;
