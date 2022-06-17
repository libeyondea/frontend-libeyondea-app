import { createAction } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';
import { Profile } from 'src/types/profile';

export const profileShowDataRequestAction = createAction(actionTypes.PROFILE_SHOW_DATA_REQUEST, (payload: Profile) => ({
	payload: payload
}));

export const profileShowDataSuccessAction = createAction(actionTypes.PROFILE_SHOW_DATA_SUCCESS, (payload: Profile) => ({
	payload: payload
}));

export const profileShowLoadingRequestAction = createAction(actionTypes.PROFILE_SHOW_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const profileShowLoadingSuccessAction = createAction(actionTypes.PROFILE_SHOW_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const profileUpdateDataRequestAction = createAction(actionTypes.PROFILE_UPDATE_DATA_REQUEST, (payload: Profile) => ({
	payload: payload
}));

export const profileUpdateDataSuccessAction = createAction(actionTypes.PROFILE_UPDATE_DATA_SUCCESS, (payload: Profile) => ({
	payload: payload
}));

export const profileUpdateLoadingRequestAction = createAction(actionTypes.PROFILE_UPDATE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const profileUpdateLoadingSuccessAction = createAction(actionTypes.PROFILE_UPDATE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));
