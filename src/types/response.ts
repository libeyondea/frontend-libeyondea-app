export type DataResponse<T> = {
	data: T;
};

export type DataWithListResponse<T> = {
	columns: string[];
	pagination: {
		total: number;
	};
} & DataResponse<T>;

export type ErrorResponse = {
	success?: boolean;
	code?: number;
	message?: string;
};
