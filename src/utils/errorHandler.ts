import axios, { AxiosError } from 'axios';
import _ from 'lodash';

import cookies from './cookies';
import toastify from './toastify';
import * as cookiesConstant from 'src/constants/cookies';
import store from 'src/store';
import { authCurrentDataTokenRequestAction, authCurrentDataUserRequestAction } from 'src/store/auth/actions';
import { ErrorResponse } from 'src/types/response';

type ErrorType = 'validation-error' | 'unauthorized-error' | 'forbidden-error' | 'notfound-error' | 'server-error' | 'axios-error' | 'stock-error';

type IErrorBase = {
	error: Error | AxiosError<ErrorResponse>;
	type: ErrorType;
};

const errorHandler = (callback?: (err: IErrorBase) => void) => {
	return (error: Error | AxiosError<ErrorResponse>) => {
		let errorType: ErrorType = 'axios-error';

		if (axios.isAxiosError<ErrorResponse>(error)) {
			if (error.response && _.includes([AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE], error.code)) {
				toastify.error(error.response.data?.message || error.message);

				switch (error.response.status) {
					case 400:
						errorType = 'validation-error';
						break;
					case 401:
						cookies.remove(cookiesConstant.COOKIES_AUTH_TOKEN);
						store.dispatch(authCurrentDataUserRequestAction(null));
						store.dispatch(authCurrentDataTokenRequestAction(null));
						errorType = 'unauthorized-error';
						break;
					case 403:
						errorType = 'forbidden-error';
						break;
					case 404:
						errorType = 'notfound-error';
						break;
					default:
						errorType = 'server-error';
				}
			} else {
				toastify.error(error.message);
			}
		} else {
			toastify.error(error.message);
			errorType = 'stock-error';
		}

		callback?.({ error, type: errorType });
	};
};

export default errorHandler;
