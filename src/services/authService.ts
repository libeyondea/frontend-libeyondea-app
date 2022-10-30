import { AxiosResponse } from 'axios';

import { Me, MeToken, SignIn, SignUp } from 'src/types/auth';
import { DataResponse } from 'src/types/response';
import http from 'src/utils/http';

const authService = {
	me: (token: string): Promise<AxiosResponse<DataResponse<Me>>> => {
		return http.get<DataResponse<Me>>({
			url: '/auth/me',
			token: token
		});
	},
	signIn: (data: SignIn): Promise<AxiosResponse<DataResponse<MeToken>>> => {
		return http.post<DataResponse<MeToken>>({
			url: '/auth/signin',
			data: data
		});
	},
	signUp: (data: SignUp): Promise<AxiosResponse<DataResponse<Me>>> => {
		return http.post<DataResponse<Me>>({
			url: '/auth/signup',
			data: data
		});
	},
	signOut: (token: string): Promise<AxiosResponse<DataResponse<null>>> => {
		return http.post<DataResponse<null>>({
			url: '/auth/signout',
			token: token
		});
	}
};

export default authService;
