import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from 'models/response';
import store from 'store';
import { authCurrentDataRequestAction, authCurrentTokenRequestAction } from 'store/auth/actions';
import { removeCookie } from './cookies';
import toastify from './toastify';
import * as cookiesConstant from 'constants/cookies';

export const errorHandler = (
	callbackAxiosError?: (err: AxiosResponse<ResponseError>) => void,
	callbackFormError?: (err: AxiosResponse<ResponseError>) => void,
	callbackStockError?: (err: Error) => void,
	options: {
		isErrorMessage?: boolean;
	} = {
		isErrorMessage: true
	}
) => {
	return (error: Error | AxiosError<ResponseError>) => {
		if (axios.isAxiosError(error) && error.response) {
			options.isErrorMessage && toastify.error(error.response.data.message);
			if (error.response.status === 401) {
				removeCookie(cookiesConstant.COOKIES_KEY_TOKEN);
				store.dispatch(authCurrentDataRequestAction(null));
				store.dispatch(authCurrentTokenRequestAction(null));
			}
			if (error.response.status === 400) {
				callbackFormError && callbackFormError(error.response);
			} else {
				callbackAxiosError && callbackAxiosError(error.response);
			}
		} else {
			options.isErrorMessage && toastify.error(error.message);
			callbackStockError && callbackStockError(error);
		}
	};
};
