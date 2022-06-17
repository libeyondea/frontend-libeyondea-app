import { AxiosResponse } from 'axios';

import config from 'src/config';
import http from 'src/helpers/http';
import { ResponseData, ResponseDataPagination } from 'src/types/response';
import { CreateUser, ListUser, UpdateUser, User } from 'src/types/user';

const userService = {
	list: (params?: ListUser): Promise<AxiosResponse<ResponseDataPagination<User[]>>> => {
		return http.get<ResponseDataPagination<User[]>>({
			url: config.API.END_POINT.USER,
			params: params
		});
	},
	show: (id: number): Promise<AxiosResponse<ResponseData<User>>> => {
		return http.get<ResponseData<User>>({
			url: `${config.API.END_POINT.USER}/${id}`
		});
	},
	create: (data: CreateUser): Promise<AxiosResponse<ResponseData<User>>> => {
		return http.post<ResponseData<User>>({
			url: config.API.END_POINT.USER,
			data: data
		});
	},
	update: (id: number, data: UpdateUser): Promise<AxiosResponse<ResponseData<User>>> => {
		return http.put<ResponseData<User>>({
			url: `${config.API.END_POINT.USER}/${id}`,
			data: data
		});
	},
	delete: (id: number): Promise<AxiosResponse<ResponseData<User>>> => {
		return http.delete<ResponseData<User>>({
			url: `${config.API.END_POINT.USER}/${id}`
		});
	}
};

export default userService;
