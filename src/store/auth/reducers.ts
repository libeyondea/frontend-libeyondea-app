import { createReducer } from '@reduxjs/toolkit';

import { authCurrentDataTokenSuccessAction, authCurrentDataUserSuccessAction } from './actions';
import { Me } from 'src/types/auth';

type AuthState = {
	current: {
		data: {
			user: Me | null;
			token: string | null;
		};
	};
};

const initialState: AuthState = {
	current: {
		data: {
			user: null,
			token: null
		}
	}
};

const authReducer = createReducer(initialState, (builder) => {
	builder.addCase(authCurrentDataUserSuccessAction, (state, action) => ({
		...state,
		current: {
			...state.current,
			data: {
				...state.current.data,
				user: action.payload
			}
		}
	}));
	builder.addCase(authCurrentDataTokenSuccessAction, (state, action) => ({
		...state,
		current: {
			...state.current,
			data: {
				...state.current.data,
				token: action.payload
			}
		}
	}));
});

export default authReducer;
