import { createReducer } from '@reduxjs/toolkit';
import { deleteArrayItemById, insertItemIntoArray, updateArrayItemById } from 'helpers/utils';
import { User } from 'models/user';
import {
	userCreateDataSuccessAction,
	userCreateLoadingSuccessAction,
	userDeleteDataSuccessAction,
	userDeleteLoadingSuccessAction,
	userListDataSuccessAction,
	userListFilterQSuccessAction,
	userListLoadingSuccessAction,
	userListPaginationLimitSuccessAction,
	userListPaginationPageSuccessAction,
	userListPaginationTotalSuccessAction,
	userShowDataSuccessAction,
	userShowLoadingSuccessAction,
	userUpdateDataSuccessAction,
	userUpdateLoadingSuccessAction
} from './actions';

type UserState = {
	list: {
		data: User[];
		pagination: {
			page: number;
			limit: number;
			limits: number[];
			total: number;
		};
		filter: {
			q: string;
		};
		loading: boolean;
	};
	show: {
		data: User;
		loading: boolean;
	};
	create: {
		data: User;
		loading: boolean;
	};
	update: {
		data: User;
		loading: boolean;
	};
	delete: {
		data: User;
		loading: boolean;
	};
};

const initialState: UserState = {
	list: {
		data: [],
		pagination: {
			page: 1,
			limit: 10,
			limits: [10, 20, 50, 100],
			total: 0
		},
		filter: {
			q: ''
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
	builder.addCase(userListPaginationLimitSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				limit: action.payload
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
	builder.addCase(userListFilterQSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				q: action.payload
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
			data: insertItemIntoArray<User>(state.list.data, action.payload),
			pagination: {
				...state.list.pagination,
				total: state.list.pagination.total + 1
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
		},
		list: {
			...state.list,
			data: updateArrayItemById<User>([...state.list.data], action.payload.id, action.payload)
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
		},
		list: {
			...state.list,
			data: deleteArrayItemById<User>([...state.list.data], action.payload.id),
			pagination: {
				...state.list.pagination,
				total: state.list.pagination.total - 1
			}
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
