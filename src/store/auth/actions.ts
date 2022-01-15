import { createAction } from '@reduxjs/toolkit';
import { Me } from 'models/auth';
import * as actionTypes from './actionTypes';

export const authCurrentRequestAction = createAction(
	actionTypes.AUTH_CURRENT_REQUEST,
	(user: Me | null, token: string | null) => ({
		payload: {
			user,
			token
		}
	})
);

export const authCurrentSuccessAction = createAction(
	actionTypes.AUTH_CURRENT_SUCCESS,
	(user: Me | null, token: string | null) => ({
		payload: {
			user,
			token
		}
	})
);
