export type ResponseDataReducer<T> = {
	data: T;
	loading: boolean;
};

export type ResponseDataWithPaginationAndFilterReducer<T> = {
	pagination: {
		page: number;
		page_size: number;
		total: number;
	};
	filter: {
		keyword: string;
		keyword_temp: string;
		sort_direction: string;
		sort_by: string;
	};
} & ResponseDataReducer<T>;
