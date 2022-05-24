import axios, { AxiosError } from 'axios';
import { ResponseError } from 'models/response';
import toastify from './toastify';

interface IAxiosError {
	error: AxiosError<ResponseError>;
	type: 'axios-error';
}
interface IStockError {
	error: Error;
	type: 'stock-error';
}

export const errorHandler = (
	callbackAxiosError?: (err: IAxiosError) => void,
	callbackStockError?: (err: IStockError) => void,
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
			callbackAxiosError &&
				callbackAxiosError({
					error: error,
					type: 'axios-error'
				});
		} else {
			options.isStockErrorMessage && toastify.error(error.message);
			callbackStockError &&
				callbackStockError({
					error: error,
					type: 'stock-error'
				});
		}
	};
};
