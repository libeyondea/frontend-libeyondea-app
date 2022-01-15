import { createReducer } from '@reduxjs/toolkit';
import { appInitializedSuccessAction, appSidebarSuccessAction } from './actions';

type AppState = {
	initialized: boolean;
	sidebar: boolean;
};

const initialState: AppState = {
	initialized: false,
	sidebar: true
};

const appReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(appInitializedSuccessAction, (state, action) => ({
			...state,
			initialized: action.payload.initialized
		}))
		.addCase(appSidebarSuccessAction, (state, action) => ({
			...state,
			sidebar: action.payload.sidebar
		}));
});

export default appReducer;
