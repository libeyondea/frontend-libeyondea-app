import { Pagination } from './pagination';

export interface ResponseData<T> {
	data: T;
}

export interface ResponseError {
	message: string;
	errors?: any;
}

export interface ResponseDataPagination<T> extends ResponseData<T> {
	pagination: Pagination;
}
