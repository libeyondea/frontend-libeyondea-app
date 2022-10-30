import { AxiosResponse } from 'axios';

import { DataPaginationResponse, DataResponse } from 'src/types/response';
import { CreateUser, ListUser, UpdateUser, User } from 'src/types/user';
import http from 'src/utils/http';

const userService = {
	list: (params?: ListUser): Promise<AxiosResponse<DataPaginationResponse<User[]>>> => {
		return http.get<DataPaginationResponse<User[]>>({
			url: '/users',
			params: params
		});
	},
	show: (id: number): Promise<AxiosResponse<DataResponse<User>>> => {
		return http.get<DataResponse<User>>({
			url: `/users/${id}`
		});
	},
	create: (data: CreateUser): Promise<AxiosResponse<DataResponse<User>>> => {
		return http.post<DataResponse<User>>({
			url: '/users',
			data: data
		});
	},
	update: (id: number, data: UpdateUser): Promise<AxiosResponse<DataResponse<User>>> => {
		return http.put<DataResponse<User>>({
			url: `/users/${id}`,
			data: data
		});
	},
	delete: (id: number): Promise<AxiosResponse<DataResponse<User>>> => {
		return http.delete<DataResponse<User>>({
			url: `/users/${id}`
		});
	}
};

export default userService;
