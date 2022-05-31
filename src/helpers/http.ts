import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from 'config';
import store from 'store';
import { ResponseError } from 'models/response';

const instance = axios.create({
	baseURL: config.API.URL.API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	},
	timeout: config.REQUEST.TIMEOUT
});

instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = store.getState().authState.current.token;
		if (config.headers && !config.headers.Authorization && token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: Error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError<ResponseError>) => {
		return Promise.reject(error);
	}
);

const http = {
	get: <T>(config: { baseURL?: string; url: string; params?: any; token?: string }): Promise<AxiosResponse<T>> => {
		return instance.request<T>({
			baseURL: config.baseURL,
			method: 'GET',
			url: config.url,
			params: config.params,
			headers: {
				...(config.token && { Authorization: `Bearer ${config.token}` })
			}
		});
	},
	post: <T>(config: { baseURL?: string; url: string; data?: any; token?: string }): Promise<AxiosResponse<T>> => {
		return instance.request<T>({
			baseURL: config.baseURL,
			method: 'POST',
			url: config.url,
			data: config.data,
			headers: {
				...(config.token && { Authorization: `Bearer ${config.token}` })
			}
		});
	},
	put: <T>(config: { baseURL?: string; url: string; data?: any; token?: string }): Promise<AxiosResponse<T>> => {
		return instance.request<T>({
			baseURL: config.baseURL,
			method: 'PUT',
			url: config.url,
			data: config.data,
			headers: {
				...(config.token && { Authorization: `Bearer ${config.token}` })
			}
		});
	},
	delete: <T>(config: { baseURL?: string; url: string; params?: any; token?: string }): Promise<AxiosResponse<T>> => {
		return instance.request<T>({
			baseURL: config.baseURL,
			method: 'DELETE',
			url: config.url,
			params: config.params,
			headers: {
				...(config.token && { Authorization: `Bearer ${config.token}` })
			}
		});
	},
	upload: <T>(config: { baseURL?: string; url: string; files?: any; data?: any; token?: string }): Promise<AxiosResponse<T>> => {
		const formData = new FormData();
		if (config.data) {
			for (let field in config.data) {
				formData.set(field, config.data[field]);
			}
		}
		if (config.files) {
			for (let field in config.files) {
				if (config.files[field]) {
					formData.append(field, config.files[field], config.files[field].name);
				}
			}
		}
		return instance.request<T>({
			baseURL: config.baseURL,
			method: 'POST',
			url: config.url,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				...(config.token && { Authorization: `Bearer ${config.token}` })
			}
		});
	}
};

export default http;
