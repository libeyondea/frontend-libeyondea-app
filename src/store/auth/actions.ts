import { createAction } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';
import { Me } from 'src/types/auth';

export const authCurrentDataRequestAction = createAction(actionTypes.AUTH_CURRENT_DATA_REQUEST, (payload: Me | null) => ({
	payload: payload
}));

export const authCurrentDataSuccessAction = createAction(actionTypes.AUTH_CURRENT_DATA_SUCCESS, (payload: Me | null) => ({
	payload: payload
}));

export const authCurrentTokenRequestAction = createAction(actionTypes.AUTH_CURRENT_TOKEN_REQUEST, (payload: string | null) => ({
	payload: payload
}));

export const authCurrentTokenSuccessAction = createAction(actionTypes.AUTH_CURRENT_TOKEN_SUCCESS, (payload: string | null) => ({
	payload: payload
}));
