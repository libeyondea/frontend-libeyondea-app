import { createReducer } from '@reduxjs/toolkit';
import { Profile } from 'models/profile';
import { ResponseDataReducer } from 'models/reducer';
import {
	profileShowDataSuccessAction,
	profileShowLoadingSuccessAction,
	profileUpdateDataSuccessAction,
	profileUpdateLoadingSuccessAction
} from './actions';

type ProfileState = {
	show: ResponseDataReducer<Profile>;
	update: ResponseDataReducer<Profile>;
};

const initialState: ProfileState = {
	show: {
		data: {} as Profile,
		is_loading: true
	},
	update: {
		data: {} as Profile,
		is_loading: false
	}
};

const profileReducer = createReducer(initialState, (builder) => {
	builder.addCase(profileShowDataSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			data: action.payload
		}
	}));
	builder.addCase(profileShowLoadingSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			is_loading: action.payload
		}
	}));

	builder.addCase(profileUpdateDataSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			data: action.payload
		}
	}));
	builder.addCase(profileUpdateLoadingSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			is_loading: action.payload
		}
	}));
});

export default profileReducer;
