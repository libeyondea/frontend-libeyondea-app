import { AxiosResponse } from 'axios';

import instance from './instance';

type GetProps = {
	baseURL?: string;
	url: string;
	params?: any;
	token?: string;
};

type PostProps = {
	baseURL?: string;
	url: string;
	params?: any;
	data?: any;
	token?: string;
};

type PutProps = PostProps;

type DeleteProps = GetProps;

type UploadProps = {
	files?: any;
} & PostProps;

const http = {
	get: <T>({ baseURL, url, params, token }: GetProps): Promise<AxiosResponse<T>> => {
		return instance.request<T>({
			baseURL: baseURL,
			method: 'GET',
			url: url,
			params: params,
			headers: {
				...(token && {
					Authorization: `Bearer ${token}`
				})
			}
		});
	},
	post: <T>({ baseURL, url, params, data, token }: PostProps): Promise<AxiosResponse<T>> => {
		return instance.request<T>({
			baseURL: baseURL,
			method: 'POST',
			url: url,
			params: params,
			data: data,
			headers: {
				...(token && {
					Authorization: `Bearer ${token}`
				})
			}
		});
	},
	put: <T>({ baseURL, url, params, data, token }: PutProps): Promise<AxiosResponse<T>> => {
		return instance.request<T>({
			baseURL: baseURL,
			method: 'PUT',
			url: url,
			params: params,
			data: data,
			headers: {
				...(token && {
					Authorization: `Bearer ${token}`
				})
			}
		});
	},
	delete: <T>({ baseURL, url, params, token }: DeleteProps): Promise<AxiosResponse<T>> => {
		return instance.request<T>({
			baseURL: baseURL,
			method: 'DELETE',
			url: url,
			params: params,
			headers: {
				...(token && {
					Authorization: `Bearer ${token}`
				})
			}
		});
	},
	upload: <T>({ baseURL, url, params, data, files, token }: UploadProps): Promise<AxiosResponse<T>> => {
		const formData = new FormData();
		if (data) {
			for (const field in data) {
				formData.set(field, data[field]);
			}
		}
		if (files) {
			for (const field in files) {
				formData.append(field, files[field], files[field].name);
			}
		}
		return instance.request<T>({
			baseURL: baseURL,
			method: 'POST',
			url: url,
			params: params,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				...(token && {
					Authorization: `Bearer ${token}`
				})
			}
		});
	}
};

export default http;
