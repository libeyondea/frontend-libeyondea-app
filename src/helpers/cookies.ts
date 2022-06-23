import cookie, { CookieAttributes } from 'js-cookie';

export const setCookie = (key: string, value: string, options?: CookieAttributes): void => {
	cookie.set(key, value, options);
};

export const removeCookie = (key: string, options?: CookieAttributes): void => {
	cookie.remove(key, options);
};

export const getCookie = (key: string): string | undefined => {
	return cookie.get(key);
};
