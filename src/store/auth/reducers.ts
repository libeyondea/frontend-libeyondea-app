import { createReducer } from '@reduxjs/toolkit';
import { Me } from 'models/auth';
import { authCurrentSuccessAction } from './actions';

type AuthState = {
	current: {
		user: Me | null;
		token: string | null;
	};
};

const initialState: AuthState = {
	current: {
		user: null,
		token: null
	}
};

const authReducer = createReducer(initialState, (builder) => {
	builder.addCase(authCurrentSuccessAction, (state, action) => ({
		...state,
		current: {
			user: action.payload.user,
			token: action.payload.token
		}
	}));
});

export default authReducer;
