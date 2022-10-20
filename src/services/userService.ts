import { AxiosResponse } from 'axios';

import { ResponseData, ResponseDataPagination } from 'src/types/response';
import { CreateUser, ListUser, UpdateUser, User } from 'src/types/user';
import http from 'src/utils/http';

const userService = {
	list: (params?: ListUser): Promise<AxiosResponse<ResponseDataPagination<User[]>>> => {
		return http.get<ResponseDataPagination<User[]>>({
			url: '/users',
			params: params
		});
	},
	show: (id: number): Promise<AxiosResponse<ResponseData<User>>> => {
		return http.get<ResponseData<User>>({
			url: `/users/${id}`
		});
	},
	create: (data: CreateUser): Promise<AxiosResponse<ResponseData<User>>> => {
		return http.post<ResponseData<User>>({
			url: '/users',
			data: data
		});
	},
	update: (id: number, data: UpdateUser): Promise<AxiosResponse<ResponseData<User>>> => {
		return http.put<ResponseData<User>>({
			url: `/users/${id}`,
			data: data
		});
	},
	delete: (id: number): Promise<AxiosResponse<ResponseData<User>>> => {
		return http.delete<ResponseData<User>>({
			url: `/users/${id}`
		});
	}
};

export default userService;
