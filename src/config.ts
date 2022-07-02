const config = {
	APP_NAME: 'Libeyondea',
	LOGGER: {
		REDUX: false
	},
	API: {
		URL: {
			ROOT_URL: process.env.REACT_APP_ROOT_URL,
			API_URL: process.env.REACT_APP_API_URL
		},
		END_POINT: {
			SIGN_IN: '/auth/signin',
			SIGN_UP: '/auth/signup',
			SIGN_OUT: '/auth/signout',
			ME: '/auth/me',
			PROFILE: '/profile',
			DASHBOARD: '/dashboard',
			SETTING: '/settings',
			USER: '/users',
			UPLOAD_IMAGE: '/images/upload'
		}
	},
	REQUEST: {
		TIMEOUT: 30000
	},
	AUTH_DATA: {
		EXPIRED_TIME: 3 / 24,
		EXPIRED_TIME_REMEMBER_ME: 365
	}
};

export default config;
