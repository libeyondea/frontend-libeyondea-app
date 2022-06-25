import axios, { AxiosError } from 'axios';

import cookies from './cookies';
import toastify from './toastify';
import * as cookiesConstant from 'src/constants/cookies';
import store from 'src/store';
import { authCurrentDataRequestAction, authCurrentTokenRequestAction } from 'src/store/auth/actions';
import { ResponseError } from 'src/types/response';

const errorHandler = (
	callbackAxiosError?: (err: AxiosError<ResponseError>) => void,
	callbackValidationError?: (err: AxiosError<ResponseError>) => void,
	callbackStockError?: (err: Error) => void
) => {
	return (error: Error | AxiosError<ResponseError>) => {
		if (axios.isAxiosError(error)) {
			toastify.error(error.response?.data?.message || error.message);
			if (error.response?.status === 401) {
				cookies.remove(cookiesConstant.COOKIES_KEY_TOKEN);
				store.dispatch(authCurrentDataRequestAction(null));
				store.dispatch(authCurrentTokenRequestAction(null));
			} else if (error.response?.status === 400) {
				callbackValidationError && callbackValidationError(error);
			} else {
				callbackAxiosError && callbackAxiosError(error);
			}
		} else {
			toastify.error(error.message);
			callbackStockError && callbackStockError(error);
		}
	};
};

export default errorHandler;
