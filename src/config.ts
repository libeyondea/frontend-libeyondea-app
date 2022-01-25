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
			CSRF: '/sanctum/csrf-cookie',

			SIGNIN: '/auth/signin',
			SIGNUP: '/auth/signup',
			SIGNOUT: '/auth/signout',
			ME: '/auth/me',

			PROFILE: '/profile',

			CRUD_USER: '/users',
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
