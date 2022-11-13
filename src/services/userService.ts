import { AxiosResponse } from 'axios';

import { DataResponse, DataWithListResponse } from 'src/types/response';
import { CreateUpdateUser, ParamUser, User } from 'src/types/user';
import http from 'src/utils/http';

const userService = {
	list: (params?: ParamUser): Promise<AxiosResponse<DataWithListResponse<User[]>>> => {
		return http.get<DataWithListResponse<User[]>>({
			url: '/users',
			params: params
		});
	},
	show: (id: number): Promise<AxiosResponse<DataResponse<User>>> => {
		return http.get<DataResponse<User>>({
			url: `/users/${id}`
		});
	},
	create: (data: CreateUpdateUser): Promise<AxiosResponse<DataResponse<User>>> => {
		return http.post<DataResponse<User>>({
			url: '/users',
			data: data
		});
	},
	update: (id: number, data: CreateUpdateUser): Promise<AxiosResponse<DataResponse<User>>> => {
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
