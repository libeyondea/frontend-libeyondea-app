import { AxiosError } from 'axios';

import cookies from './cookies';
import toastify from './toastify';
import * as cookiesConstant from 'src/constants/cookies';
import store from 'src/store';
import { authCurrentDataRequestAction, authCurrentTokenRequestAction } from 'src/store/auth/actions';
import { ResponseError } from 'src/types/response';

type IErrorBase = {
	error: Error | AxiosError<ResponseError>;
	type: 'unauthorized-error' | 'forbidden-error' | 'notfound-error' | 'validation-error' | 'server-error' | 'stock-error';
};

type IUnauthorizedError = {
	error: AxiosError<ResponseError>;
	type: 'unauthorized-error';
} & IErrorBase;

type IForbiddenError = {
	error: AxiosError<ResponseError>;
	type: 'forbidden-error';
} & IErrorBase;

type INotFoundError = {
	error: AxiosError<ResponseError>;
	type: 'notfound-error';
} & IErrorBase;

type IValidationError = {
	error: AxiosError<ResponseError>;
	type: 'validation-error';
} & IErrorBase;

type IServerError = {
	error: AxiosError<ResponseError>;
	type: 'server-error';
} & IErrorBase;

type IStockError = {
	error: Error;
	type: 'stock-error';
} & IErrorBase;

const errorHandler = (callback?: (err: IUnauthorizedError | IForbiddenError | INotFoundError | IValidationError | IServerError | IStockError) => void) => {
	return (error: Error | AxiosError<ResponseError>) => {
		if (error instanceof AxiosError<ResponseError>) {
			if (error.code === AxiosError.ERR_BAD_REQUEST) {
				toastify.error(error.response?.data.message);
				if (error.response?.status === 401) {
					cookies.remove(cookiesConstant.COOKIES_KEY_TOKEN);
					store.dispatch(authCurrentDataRequestAction(null));
					store.dispatch(authCurrentTokenRequestAction(null));
					callback &&
						callback({
							error: error,
							type: 'unauthorized-error'
						});
				} else if (error.response?.status === 403) {
					callback &&
						callback({
							error: error,
							type: 'forbidden-error'
						});
				} else if (error.response?.status === 404) {
					callback &&
						callback({
							error: error,
							type: 'notfound-error'
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
							type: 'server-error'
						});
				}
			} else {
				toastify.error(error.message);
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
