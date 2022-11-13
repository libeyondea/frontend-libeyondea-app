export type DataReducer<T> = {
	data: T;
	loading: boolean;
};

export type DataWithListReducer<T> = {
	columns: string[];
	pagination: {
		page: number;
		page_size: number;
		total: number;
	};
	search: string;
	search_temp: string;
	sort_by: string;
	sort_direction: string;
} & DataReducer<T>;
