import { createReducer } from '@reduxjs/toolkit';

import { appInitializedSuccessAction } from './actions';

type AppState = {
	initialized: boolean;
};

const initialState: AppState = {
	initialized: false
};

const appReducer = createReducer(initialState, (builder) => {
	builder.addCase(appInitializedSuccessAction, (state, action) => ({
		...state,
		initialized: action.payload.initialized
	}));
});

export default appReducer;
