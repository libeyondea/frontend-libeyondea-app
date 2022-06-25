export type ResponseDataReducer<T> = {
	data: T;
	loading: boolean;
};

export type ResponseDataWithPaginationAndFilterReducer<T> = {
	pagination: {
		page: number;
		limit: number;
		total: number;
	};
	filter: {
		q: string;
		q_temp: string;
		sort_direction: string;
		sort_by: string;
	};
} & ResponseDataReducer<T>;
