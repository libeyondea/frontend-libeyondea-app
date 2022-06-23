import axios, { AxiosError } from 'axios';

import { removeCookie } from './cookies';
import toastify from './toastify';
import * as cookiesConstant from 'src/constants/cookies';
import store from 'src/store';
import { authCurrentDataRequestAction, authCurrentTokenRequestAction } from 'src/store/auth/actions';
import { ResponseError } from 'src/types/response';

export const errorHandler = (
	callbackAxiosError?: (err: AxiosError<ResponseError | undefined>) => void,
	callbackValidationError?: (err: AxiosError<ResponseError | undefined>) => void,
	callbackStockError?: (err: Error) => void
) => {
	return (error: Error | AxiosError<ResponseError | undefined>) => {
		if (axios.isAxiosError(error)) {
			toastify.error(error.response?.data?.message || error.message);
			const status = error.response?.status || null;
			if (status === 401) {
				removeCookie(cookiesConstant.COOKIES_KEY_TOKEN);
				store.dispatch(authCurrentDataRequestAction(null));
				store.dispatch(authCurrentTokenRequestAction(null));
			} else if (status === 400) {
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
