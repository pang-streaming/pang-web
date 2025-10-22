import Cookies from 'js-cookie';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

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

// 쿠키 옵션을 동적으로 생성하는 함수
const getCookieOptions = (): Cookies.CookieAttributes => {
  const domain = getCookieDomain();
  return {
    path: '/',
    ...(domain && { domain }), // domain이 있을 때만 포함
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  };
};

export const tokenStorage = {
  setAccessToken: (token: string) => {
    const options = getCookieOptions();
    Cookies.set(TOKEN_KEY, token, {
      ...options,
      expires: 1,
    });
    console.log('Setting accessToken cookie with options:', options);
  },

  getAccessToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  removeAccessToken: () => {
    const options = getCookieOptions();
    Cookies.remove(TOKEN_KEY, options);
  },

  setRefreshToken: (token: string) => {
    const options = getCookieOptions();
    Cookies.set(REFRESH_TOKEN_KEY, token, {
      ...options,
      expires: 7,
    });
    console.log('Setting refreshToken cookie with options:', options);
  },

  getRefreshToken: (): string | undefined => {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  removeRefreshToken: () => {
    const options = getCookieOptions();
    Cookies.remove(REFRESH_TOKEN_KEY, options);
  },

  clearAll: () => {
    const options = getCookieOptions();
    console.log('Clearing cookies with options:', options);
    
    // Remove with current cookie options
    Cookies.remove(TOKEN_KEY, options);
    Cookies.remove(REFRESH_TOKEN_KEY, options);
    
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

