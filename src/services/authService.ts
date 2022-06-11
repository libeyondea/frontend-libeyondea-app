import http from 'helpers/http';
import config from 'config';
import { Me, SignIn, SignUp, Token } from 'types/auth';
import { ResponseData } from 'types/response';
import { AxiosResponse } from 'axios';

const authService = {
	me: (token: string): Promise<AxiosResponse<ResponseData<Me>>> => {
		return http.get<ResponseData<Me>>({
			url: config.API.END_POINT.ME,
			token: token
		});
	},
	signIn: (data: SignIn): Promise<AxiosResponse<ResponseData<Token>>> => {
		return http.post<ResponseData<Token>>({
			url: config.API.END_POINT.SIGN_IN,
			data: data
		});
	},
	signUp: (data: SignUp): Promise<AxiosResponse<ResponseData<Me>>> => {
		return http.post<ResponseData<Me>>({
			url: config.API.END_POINT.SIGN_UP,
			data: data
		});
	},
	signOut: (token: string): Promise<AxiosResponse<ResponseData<null>>> => {
		return http.post<ResponseData<null>>({
			url: config.API.END_POINT.SIGN_OUT,
			token: token
		});
	}
};

export default authService;
