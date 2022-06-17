import { createReducer } from '@reduxjs/toolkit';

import { profileShowDataSuccessAction, profileShowLoadingSuccessAction, profileUpdateDataSuccessAction, profileUpdateLoadingSuccessAction } from './actions';
import { Profile } from 'src/types/profile';
import { ResponseDataReducer } from 'src/types/reducer';

type ProfileState = {
	show: ResponseDataReducer<Profile>;
	update: ResponseDataReducer<Profile>;
};

const initialState: ProfileState = {
	show: {
		data: {} as Profile,
		loading: true
	},
	update: {
		data: {} as Profile,
		loading: false
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
			loading: action.payload
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
			loading: action.payload
		}
	}));
});

export default profileReducer;
