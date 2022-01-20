import http from 'helpers/http';
import config from 'config';
import { Me, Signin, Signup, Token } from 'models/auth';
import { ResponseData } from 'models/response';

const authService = {
	me: (token: string) => {
		return http.get<ResponseData<Me>>({
			url: config.API.END_POINT.ME,
			token: token
		});
	},
	signin: (data: Signin) => {
		return http.post<ResponseData<Token>>({
			url: config.API.END_POINT.SIGNIN,
			data: data
		});
	},
	signup: (data: Signup) => {
		return http.post<ResponseData<Me>>({
			url: config.API.END_POINT.SIGNUP,
			data: data
		});
	},
	signout: (token: string) => {
		return http.post<ResponseData<any>>({
			url: config.API.END_POINT.SIGNOUT,
			token: token
		});
	},
	csrf: () => {
		return http.get<any>({
			baseURL: config.API.URL.ROOT_URL,
			url: config.API.END_POINT.CSRF
		});
	}
};

export default authService;
