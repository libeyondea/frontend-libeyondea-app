import axios, { AxiosError } from 'axios';
import { ResponseError } from 'models/response';
import store from 'store';
import { authCurrentRequestAction } from 'store/auth/actions';
import { removeCookie } from './cookies';
import toastify from './toastify';
import * as cookiesConstant from 'constants/cookies';

export const errorHandler = (
	callbackAxiosError?: (err: AxiosError<ResponseError>) => void,
	callbackStockError?: (err: Error) => void,
	callbackFormError?: (err: AxiosError<ResponseError>) => void,
	options: {
		isAxiosErrorMessage?: boolean;
		isStockErrorMessage?: boolean;
	} = {
		isAxiosErrorMessage: true,
		isStockErrorMessage: true
	}
) => {
	return (error: Error | AxiosError<ResponseError>) => {
		if (axios.isAxiosError(error)) {
			options.isAxiosErrorMessage && toastify.error(error.response?.data.message);
			if (error.response?.status === 401) {
				removeCookie(cookiesConstant.COOKIES_KEY_TOKEN);
				store.dispatch(authCurrentRequestAction(null, null));
			}
			if (error.response?.data.errors && error.response.status === 400) {
				callbackFormError && callbackFormError(error);
			}
			callbackAxiosError && callbackAxiosError(error);
		} else {
			options.isStockErrorMessage && toastify.error(error.message);
			callbackStockError && callbackStockError(error);
		}
	};
};
