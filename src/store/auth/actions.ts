import { createAction } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';
import { Me } from 'src/types/auth';

export const authCurrentDataUserRequestAction = createAction(actionTypes.AUTH_CURRENT_DATA_USER_REQUEST, (payload: Me | null) => ({
	payload: payload
}));

export const authCurrentDataUserSuccessAction = createAction(actionTypes.AUTH_CURRENT_DATA_USER_SUCCESS, (payload: Me | null) => ({
	payload: payload
}));

export const authCurrentDataTokenRequestAction = createAction(actionTypes.AUTH_CURRENT_DATA_TOKEN_REQUEST, (payload: string | null) => ({
	payload: payload
}));

export const authCurrentDataTokenSuccessAction = createAction(actionTypes.AUTH_CURRENT_DATA_TOKEN_SUCCESS, (payload: string | null) => ({
	payload: payload
}));
