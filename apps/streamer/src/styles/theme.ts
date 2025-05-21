export const colors = {
  // 배경
  background: {
    primary: '#1A1A1A',
    secondary: '#1E1E1E',
    tertiary: '#2A2A2A',
    dark: '#000000',
  },
  // 강조
  accent: {
    primary: '#FF1B6D',
    primaryHover: '#FF0058',
    secondary: '#A15EFF',
    golden: '#FFD700',
  },
  // 텍스트
  text: {
    primary: '#FFFFFF',
    secondary: '#999999',
    tertiary: '#666666',
  },
  border: {
    primary: '#333333',
    secondary: '#2A2A2A',
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '32px',
};

export const fontSizes = {
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '18px',
  xxl: '24px',
};

export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
};

export const shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0 2px 10px rgba(0, 0, 0, 0.2)',
};

export const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  largeDesktop: '1200px',
};

const theme = {
  colors,
  spacing,
  fontSizes,
  borderRadius,
  shadows,
  breakpoints,
};

export default theme;
