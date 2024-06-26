const config = {
	APP_NAME: 'Libeyondea',
	LOGGER: {
		REDUX: false
	},
	DEFAULT_THEME: 'light',
	URL: {
		BASE_URL: import.meta.env.VITE_BASE_URL,
		BASE_API_URL: import.meta.env.VITE_BASE_API_URL
	},
	REQUEST: {
		TIMEOUT: 30000
	},
	AUTH: {
		EXPIRED_TIME: 3 / 24,
		EXPIRED_TIME_REMEMBER_ME: 365
	}
};

export default config;
