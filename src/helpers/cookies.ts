import cookie from 'js-cookie';

export const setCookie = (key: string, value: string, options?: cookie.CookieAttributes | undefined): void => {
	cookie.set(key, value, options);
};

export const removeCookie = (key: string, options?: cookie.CookieAttributes | undefined): void => {
	cookie.remove(key, options);
};

export const getCookie = (key: string): string | undefined => {
	return cookie.get(key);
};
