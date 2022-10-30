export type DataResponse<T> = {
	data: T;
};

export type DataPaginationResponse<T> = {
	pagination: {
		total: number;
	};
} & DataResponse<T>;

export type ErrorResponse = {
	message?: string;
	errors?: any;
};
