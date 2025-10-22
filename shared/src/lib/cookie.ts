import Cookies from 'js-cookie';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// 도메인 자동 감지 함수
const getCookieDomain = (): string | undefined => {
  if (import.meta.env.VITE_COOKIE_DOMAIN) {
    return import.meta.env.VITE_COOKIE_DOMAIN;
  }
  
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'localhost';
  }
  
  return undefined;
};

const cookieOptions: Cookies.CookieAttributes = {
  path: '/',
  domain: getCookieDomain(),
  sameSite: 'lax',
  secure: import.meta.env.PROD,
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
    // Remove with current cookie options
    Cookies.remove(TOKEN_KEY, cookieOptions);
    Cookies.remove(REFRESH_TOKEN_KEY, cookieOptions);
    
    // Also try removing without domain option for fallback
    Cookies.remove(TOKEN_KEY, { path: '/' });
    Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
    
    // For production domains, also try removing with root domain
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      // Extract root domain (e.g., "euns.dev" from "www.euns.dev")
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        const rootDomain = '.' + parts.slice(-2).join('.');
        Cookies.remove(TOKEN_KEY, { path: '/', domain: rootDomain });
        Cookies.remove(REFRESH_TOKEN_KEY, { path: '/', domain: rootDomain });
      }
    }
  },
};

