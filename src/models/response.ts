export interface ResponseData<T> {
	data: T;
}

export interface ResponseDataPagination<T> extends ResponseData<T> {
	pagination: {
		total: number;
	};
}

export interface ResponseError {
	message: string;
	errors?: any;
}
