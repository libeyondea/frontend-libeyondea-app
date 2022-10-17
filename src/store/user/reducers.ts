import { createReducer } from '@reduxjs/toolkit';

import {
	userCreateDataSuccessAction,
	userCreateLoadingSuccessAction,
	userDeleteDataSuccessAction,
	userDeleteLoadingSuccessAction,
	userListDataSuccessAction,
	userListFilterKeywordSuccessAction,
	userListFilterKeywordTempSuccessAction,
	userListFilterSortBySuccessAction,
	userListFilterSortDirectionSuccessAction,
	userListLoadingSuccessAction,
	userListPaginationPageSizeSuccessAction,
	userListPaginationPageSuccessAction,
	userListPaginationTotalSuccessAction,
	userShowDataSuccessAction,
	userShowLoadingSuccessAction,
	userUpdateDataSuccessAction,
	userUpdateLoadingSuccessAction
} from './actions';
import * as filterConstant from 'src/constants/filter';
import * as paginationConstant from 'src/constants/pagination';
import { ResponseDataPaginationFilterReducer, ResponseDataReducer } from 'src/types/reducer';
import { User } from 'src/types/user';

type UserState = {
	list: ResponseDataPaginationFilterReducer<User[]>;
	show: ResponseDataReducer<User>;
	create: ResponseDataReducer<User>;
	update: ResponseDataReducer<User>;
	delete: ResponseDataReducer<User>;
};

const initialState: UserState = {
	list: {
		data: [],
		pagination: {
			page: paginationConstant.PAGINATION_DEFAULT_PAGE,
			page_size: paginationConstant.PAGINATION_DEFAULT_PAGE_SIZE,
			total: 0
		},
		filter: {
			keyword: '',
			keyword_temp: '',
			sort_direction: filterConstant.FILTER_DEFAULT_SORT_DIRECTION,
			sort_by: filterConstant.FILTER_DEFAULT_SORT_BY
		},
		loading: true
	},
	show: {
		data: {} as User,
		loading: true
	},
	create: {
		data: {} as User,
		loading: false
	},
	update: {
		data: {} as User,
		loading: false
	},
	delete: {
		data: {} as User,
		loading: false
	}
};

const userReducer = createReducer(initialState, (builder) => {
	builder.addCase(userListDataSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			data: action.payload
		}
	}));
	builder.addCase(userListPaginationPageSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				page: action.payload
			}
		}
	}));
	builder.addCase(userListPaginationPageSizeSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				page_size: action.payload
			}
		}
	}));
	builder.addCase(userListPaginationTotalSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				total: action.payload
			}
		}
	}));
	builder.addCase(userListFilterSortBySuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				sort_by: action.payload
			}
		}
	}));
	builder.addCase(userListFilterSortDirectionSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				sort_direction: action.payload
			}
		}
	}));
	builder.addCase(userListFilterKeywordSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				page: 1
			},
			filter: {
				...state.list.filter,
				keyword: action.payload
			}
		}
	}));
	builder.addCase(userListFilterKeywordTempSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				keyword_temp: action.payload
			}
		}
	}));
	builder.addCase(userListLoadingSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			loading: action.payload
		}
	}));
	builder.addCase(userShowDataSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			data: action.payload
		}
	}));
	builder.addCase(userShowLoadingSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			loading: action.payload
		}
	}));
	builder.addCase(userCreateDataSuccessAction, (state, action) => ({
		...state,
		create: {
			...state.create,
			data: action.payload
		},
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				page: 1
			}
		}
	}));
	builder.addCase(userCreateLoadingSuccessAction, (state, action) => ({
		...state,
		create: {
			...state.create,
			loading: action.payload
		}
	}));
	builder.addCase(userUpdateDataSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			data: action.payload
		}
	}));
	builder.addCase(userUpdateLoadingSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			loading: action.payload
		}
	}));
	builder.addCase(userDeleteDataSuccessAction, (state, action) => ({
		...state,
		delete: {
			...state.delete,
			data: action.payload
		}
	}));
	builder.addCase(userDeleteLoadingSuccessAction, (state, action) => ({
		...state,
		delete: {
			...state.delete,
			loading: action.payload
		}
	}));
});

export default userReducer;
