import http from 'helpers/http';
import config from 'config';
import { Me, Signin, Signup, Token } from 'types/auth';
import { ResponseData } from 'types/response';
import { AxiosResponse } from 'axios';

const authService = {
	me: (token: string): Promise<AxiosResponse<ResponseData<Me>>> => {
		return http.get<ResponseData<Me>>({
			url: config.API.END_POINT.ME,
			token: token
		});
	},
	signin: (data: Signin): Promise<AxiosResponse<ResponseData<Token>>> => {
		return http.post<ResponseData<Token>>({
			url: config.API.END_POINT.SIGNIN,
			data: data
		});
	},
	signup: (data: Signup): Promise<AxiosResponse<ResponseData<Me>>> => {
		return http.post<ResponseData<Me>>({
			url: config.API.END_POINT.SIGNUP,
			data: data
		});
	},
	signout: (token: string): Promise<AxiosResponse<ResponseData<null>>> => {
		return http.post<ResponseData<null>>({
			url: config.API.END_POINT.SIGNOUT,
			token: token
		});
	}
};

export default authService;
