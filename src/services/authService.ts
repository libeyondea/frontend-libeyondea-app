import { AxiosResponse } from 'axios';

import config from 'src/config';
import http from 'src/helpers/http';
import { Me, SignIn, SignUp, Token } from 'src/types/auth';
import { ResponseData } from 'src/types/response';

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
