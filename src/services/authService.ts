import { AxiosResponse } from 'axios';

import { Me, MeToken, SignIn, SignUp } from 'src/types/auth';
import { ResponseData } from 'src/types/response';
import http from 'src/utils/http';

const authService = {
	me: (token: string): Promise<AxiosResponse<ResponseData<Me>>> => {
		return http.get<ResponseData<Me>>({
			url: '/auth/me',
			token: token
		});
	},
	signIn: (data: SignIn): Promise<AxiosResponse<ResponseData<MeToken>>> => {
		return http.post<ResponseData<MeToken>>({
			url: '/auth/signin',
			data: data
		});
	},
	signUp: (data: SignUp): Promise<AxiosResponse<ResponseData<Me>>> => {
		return http.post<ResponseData<Me>>({
			url: '/auth/signup',
			data: data
		});
	},
	signOut: (token: string): Promise<AxiosResponse<ResponseData<null>>> => {
		return http.post<ResponseData<null>>({
			url: '/auth/signout',
			token: token
		});
	}
};

export default authService;
