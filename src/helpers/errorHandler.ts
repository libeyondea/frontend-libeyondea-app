import axios, { AxiosError } from 'axios';

import cookies from './cookies';
import toastify from './toastify';
import * as cookiesConstant from 'src/constants/cookies';
import store from 'src/store';
import { authCurrentDataRequestAction, authCurrentTokenRequestAction } from 'src/store/auth/actions';
import { ResponseError } from 'src/types/response';

type IErrorBase = {
	error: Error | AxiosError<ResponseError>;
	type: 'unauthorized-error' | 'validation-error' | 'axios-error' | 'stock-error';
};

type IUnauthorizedError = {
	error: AxiosError<ResponseError>;
	type: 'unauthorized-error';
} & IErrorBase;

type IValidationError = {
	error: AxiosError<ResponseError>;
	type: 'validation-error';
} & IErrorBase;

type IAxiosError = {
	error: AxiosError<ResponseError>;
	type: 'axios-error';
} & IErrorBase;

type IStockError = {
	error: Error;
	type: 'stock-error';
} & IErrorBase;

const errorHandler = (callback?: (err: IUnauthorizedError | IValidationError | IAxiosError | IStockError) => void) => {
	return (error: Error | AxiosError<ResponseError>) => {
		if (axios.isAxiosError(error)) {
			toastify.error(error.response?.data?.message || error.message);
			if (error.response?.status === 401) {
				cookies.remove(cookiesConstant.COOKIES_KEY_TOKEN);
				store.dispatch(authCurrentDataRequestAction(null));
				store.dispatch(authCurrentTokenRequestAction(null));
				callback &&
					callback({
						error: error,
						type: 'unauthorized-error'
					});
			} else if (error.response?.status === 400) {
				callback &&
					callback({
						error: error,
						type: 'validation-error'
					});
			} else {
				callback &&
					callback({
						error: error,
						type: 'axios-error'
					});
			}
		} else {
			toastify.error(error.message);
			callback &&
				callback({
					error: error,
					type: 'stock-error'
				});
		}
	};
};

export default errorHandler;
