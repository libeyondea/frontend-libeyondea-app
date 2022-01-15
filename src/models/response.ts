import { Pagination } from './pagination';

export interface ResponseData<T> {
	data: T;
}

export interface ResponseDataPagination<T> extends ResponseData<T> {
	pagination: Pagination;
}
