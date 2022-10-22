import axios from 'axios';

import config from 'src/config';
import store from 'src/store';

const axiosService = axios.create({
	baseURL: config.URL.BASE_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	},
	timeout: config.REQUEST.TIMEOUT
});

axiosService.interceptors.request.use(
	(config) => {
		const token = store.getState().authState.current.data.token;
		if (config.headers && !config.headers.Authorization && token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosService.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosService;
