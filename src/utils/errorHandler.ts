import axios, { AxiosError } from 'axios';
import _ from 'lodash';

import cookies from './cookies';
import toastify from './toastify';
import * as cookiesConstant from 'src/constants/cookies';
import store from 'src/store';
import { authCurrentDataTokenRequestAction, authCurrentDataUserRequestAction } from 'src/store/auth/actions';
import { ErrorResponse } from 'src/types/response';

type IErrorBase = {
	error: Error | AxiosError<ErrorResponse>;
	type: 'validation-error' | 'unauthorized-error' | 'forbidden-error' | 'notfound-error' | 'server-error' | 'axios-error' | 'stock-error';
};

type IValidationError = {
	error: AxiosError<ErrorResponse>;
	type: 'validation-error';
} & IErrorBase;

type IUnauthorizedError = {
	error: AxiosError<ErrorResponse>;
	type: 'unauthorized-error';
} & IErrorBase;

type IForbiddenError = {
	error: AxiosError<ErrorResponse>;
	type: 'forbidden-error';
} & IErrorBase;

type INotFoundError = {
	error: AxiosError<ErrorResponse>;
	type: 'notfound-error';
} & IErrorBase;

type IServerError = {
	error: AxiosError<ErrorResponse>;
	type: 'server-error';
} & IErrorBase;

type IAxiosError = {
	error: AxiosError<ErrorResponse>;
	type: 'axios-error';
} & IErrorBase;

type IStockError = {
	error: Error;
	type: 'stock-error';
} & IErrorBase;

const errorHandler = (
	callback?: (err: IValidationError | IUnauthorizedError | IForbiddenError | INotFoundError | IServerError | IAxiosError | IStockError) => void
) => {
	return (error: Error | AxiosError<ErrorResponse>) => {
		if (axios.isAxiosError<ErrorResponse>(error)) {
			if (error.response && _.includes([AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE], error.code)) {
				toastify.error(error.response.data.message || error.message);
				if (error.response?.status === 400) {
					callback &&
						callback({
							error: error,
							type: 'validation-error'
						});
				} else if (error.response?.status === 401) {
					cookies.remove(cookiesConstant.COOKIES_AUTH_TOKEN);
					store.dispatch(authCurrentDataUserRequestAction(null));
					store.dispatch(authCurrentDataTokenRequestAction(null));
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
				} else {
					callback &&
						callback({
							error: error,
							type: 'server-error'
						});
				}
			} else {
				toastify.error(error.message);
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
