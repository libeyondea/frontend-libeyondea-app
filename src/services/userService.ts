import http from 'helpers/http';
import config from 'config';
import { CreateUser, ListUser, UpdateUser, User } from 'models/user';
import { ResponseData, ResponseDataPagination } from 'models/response';

const userService = {
	list: (params?: ListUser) => {
		return http.get<ResponseDataPagination<User[]>>({
			url: config.API.END_POINT.CRUD_USER,
			params: params
		});
	},
	show: (id: number) => {
		return http.get<ResponseData<User>>({
			url: `${config.API.END_POINT.CRUD_USER}/${id}`
		});
	},
	create: (data: CreateUser) => {
		return http.post<ResponseData<User>>({
			url: config.API.END_POINT.CRUD_USER,
			data: data
		});
	},
	update: (id: number, data: UpdateUser) => {
		return http.put<ResponseData<User>>({
			url: `${config.API.END_POINT.CRUD_USER}/${id}`,
			data: data
		});
	},
	delete: (id: number) => {
		return http.delete<ResponseData<User>>({
			url: `${config.API.END_POINT.CRUD_USER}/${id}`
		});
	}
};

export default userService;
