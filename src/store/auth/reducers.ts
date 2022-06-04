import { createReducer } from '@reduxjs/toolkit';
import { Me } from 'types/auth';
import { authCurrentDataSuccessAction, authCurrentTokenSuccessAction } from './actions';

type AuthState = {
	current: {
		data: Me | null;
		token: string | null;
	};
};

const initialState: AuthState = {
	current: {
		data: null,
		token: null
	}
};

const authReducer = createReducer(initialState, (builder) => {
	builder.addCase(authCurrentDataSuccessAction, (state, action) => ({
		...state,
		current: {
			...state.current,
			data: action.payload
		}
	}));
	builder.addCase(authCurrentTokenSuccessAction, (state, action) => ({
		...state,
		current: {
			...state.current,
			token: action.payload
		}
	}));
});

export default authReducer;
