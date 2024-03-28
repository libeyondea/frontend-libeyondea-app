import { createAction } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';

export const appInitializedRequestAction = createAction(actionTypes.APP_INITIALIZED_REQUEST, (initialized: boolean) => ({
	payload: {
		initialized
	}
}));

export const appInitializedSuccessAction = createAction(actionTypes.APP_INITIALIZED_SUCCESS, (initialized: boolean) => ({
	payload: {
		initialized
	}
}));
