const config = {
	APP_NAME: 'Libeyondea',
	LOGO_URL: '/images/libeyondea.png',
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
			USER: '/users',
			SETTING: '/settings',
			UPLOAD_IMAGE: '/images/upload'
		}
	},
	REQUEST: {
		TIMEOUT: 30000
	},
	AUTH_DATA: {
		EXPIRED_TIME: 365
	}
};

export default config;
