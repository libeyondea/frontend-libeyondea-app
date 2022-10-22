export type ResponseDataReducer<T> = {
	data: T;
	loading: boolean;
};

export type ResponseDataPaginationSearchSortReducer<T> = {
	pagination: {
		page: number;
		page_size: number;
		total: number;
	};
	search: string;
	search_temp: string;
	sort_by: string;
	sort_direction: string;
} & ResponseDataReducer<T>;
