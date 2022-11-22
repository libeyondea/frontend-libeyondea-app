import { createReducer } from '@reduxjs/toolkit';

import {
	userCreateDataSuccessAction,
	userCreateLoadingSuccessAction,
	userDeleteDataSuccessAction,
	userDeleteLoadingSuccessAction,
	userListColumnSuccessAction,
	userListDataSuccessAction,
	userListLoadingSuccessAction,
	userListPaginationPageSizeSuccessAction,
	userListPaginationPageSuccessAction,
	userListPaginationTotalSuccessAction,
	userListSearchSuccessAction,
	userListSearchTempSuccessAction,
	userListSortBySuccessAction,
	userListSortDirectionSuccessAction,
	userShowDataSuccessAction,
	userShowLoadingSuccessAction,
	userUpdateDataSuccessAction,
	userUpdateLoadingSuccessAction
} from './actions';
import * as paginationConstant from 'src/constants/pagination';
import * as sortConstant from 'src/constants/sort';
import { DataReducer, DataWithListReducer } from 'src/types/reducer';
import { User } from 'src/types/user';

type UserState = {
	list: DataWithListReducer<User[]>;
	show: DataReducer<User>;
	create: DataReducer<User>;
	update: DataReducer<User>;
	delete: DataReducer<User>;
};

const initialState: UserState = {
	list: {
		data: [],
		columns: [],
		pagination: {
			page: paginationConstant.PAGINATION_PAGE,
			page_size: paginationConstant.PAGINATION_PAGE_SIZE,
			total: 0
		},
		sort_by: sortConstant.SORT_BY,
		sort_direction: sortConstant.SORT_DIRECTION,
		search: '',
		search_temp: '',
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
	builder.addCase(userListColumnSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			columns: action.payload
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
	builder.addCase(userListSortBySuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			sort_by: action.payload
		}
	}));
	builder.addCase(userListSortDirectionSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			sort_direction: action.payload
		}
	}));
	builder.addCase(userListSearchSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				page: 1
			},
			search: action.payload
		}
	}));
	builder.addCase(userListSearchTempSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			search_temp: action.payload
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
