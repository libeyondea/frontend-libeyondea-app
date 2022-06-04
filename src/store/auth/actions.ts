import { createAction } from '@reduxjs/toolkit';
import { Me } from 'types/auth';
import * as actionTypes from './actionTypes';

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
