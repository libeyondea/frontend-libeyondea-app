export type ResponseData<T> = {
	data: T;
};

export type ResponseDataPagination<T> = {
	pagination: {
		total: number;
	};
} & ResponseData<T>;

export type ResponseError = {
	message: string;
	errors?: any;
};
