import { AxiosResponse } from 'axios';

import { Me, SignIn, SignUp } from 'src/types/auth';
import { DataResponse } from 'src/types/response';
import http from 'src/utils/http';

const authService = {
	me: (token: string): Promise<AxiosResponse<DataResponse<Me>>> => {
		return http.get<DataResponse<Me>>({
			url: '/me',
			token: token
		});
	},
	signIn: (data: SignIn): Promise<AxiosResponse<DataResponse<Me>>> => {
		return http.post<DataResponse<Me>>({
			url: '/signin',
			data: data
		});
	},
	signUp: (data: SignUp): Promise<AxiosResponse<DataResponse<Me>>> => {
		return http.post<DataResponse<Me>>({
			url: '/signup',
			data: data
		});
	},
	signOut: (token: string): Promise<AxiosResponse<DataResponse<null>>> => {
		return http.post<DataResponse<null>>({
			url: '/signout',
			token: token
		});
	}
};

export default authService;
