import Cookies from 'js-cookie';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Cookie 옵션 (localhost에서 포트 간 공유)
const cookieOptions: Cookies.CookieAttributes = {
  path: '/',
  // sameSite: 'lax', // CSRF 방어
  // secure: false, // 개발 환경에서는 false (배포 시 true)
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

