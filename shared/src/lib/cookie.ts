import Cookies from 'js-cookie';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// 도메인 자동 감지 함수
const getCookieDomain = (): string | undefined => {
  // 환경 변수가 있으면 우선 사용
  if (import.meta.env.VITE_COOKIE_DOMAIN) {
    return import.meta.env.VITE_COOKIE_DOMAIN;
  }
  
  // 현재 호스트가 euns.dev 서브도메인이면 .euns.dev 사용
  const hostname = window.location.hostname;
  if (hostname.endsWith('.euns.dev')) {
    return '.euns.dev';
  }
  
  // localhost 개발 환경
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'localhost';
  }
  
  // 기본값은 undefined (현재 도메인만)
  return undefined;
};

// Cookie 옵션 (서브도메인 간 공유)
const cookieOptions: Cookies.CookieAttributes = {
  path: '/',
  domain: getCookieDomain(), // 자동 감지된 도메인 사용
  sameSite: 'lax', // CSRF 방어
  secure: import.meta.env.PROD, // 프로덕션 환경에서는 true
};

export const tokenStorage = {
  setAccessToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      ...cookieOptions,
      expires: 1,
    });
  },

  getAccessToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  removeAccessToken: () => {
    Cookies.remove(TOKEN_KEY, cookieOptions);
  },

  setRefreshToken: (token: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, token, {
      ...cookieOptions,
      expires: 7,
    });
  },

  getRefreshToken: (): string | undefined => {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  removeRefreshToken: () => {
    Cookies.remove(REFRESH_TOKEN_KEY, cookieOptions);
  },

  clearAll: () => {
    Cookies.remove(TOKEN_KEY, cookieOptions);
    Cookies.remove(REFRESH_TOKEN_KEY, cookieOptions);
  },
};

