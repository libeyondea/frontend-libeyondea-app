import cookie, { CookieAttributes } from 'js-cookie';

const cookies = {
	set: (key: string, value: string, options?: CookieAttributes): void => {
		cookie.set(key, value, options);
	},
	get: (key: string): string | undefined => {
		return cookie.get(key);
	},
	remove: (key: string, options?: CookieAttributes): void => {
		cookie.remove(key, options);
	}
};

export default cookies;
