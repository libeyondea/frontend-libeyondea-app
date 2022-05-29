export interface ResponseDataReducer<T> {
	data: T;
	is_loading: boolean;
}

export interface ResponseDataWithPaginationAndFilterReducer<T> extends ResponseDataReducer<T> {
	pagination: {
		page: number;
		limit: number;
		total: number;
	};
	filter: {
		q: string;
		sort_direction: string;
		sort_by: string;
	};
}
