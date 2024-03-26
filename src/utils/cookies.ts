import cookie from 'js-cookie';

const cookies = {
	get: (key: string): string | undefined => {
		return cookie.get(key);
	},
	set: (key: string, value: string, options?: Cookies.CookieAttributes): void => {
		cookie.set(key, value, options);
	},
	remove: (key: string, options?: Cookies.CookieAttributes): void => {
		cookie.remove(key, options);
	}
};

export default cookies;
