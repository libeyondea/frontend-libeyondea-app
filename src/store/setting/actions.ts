import { createAction } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';
import { Setting } from 'src/types/setting';

export const settingShowDataRequestAction = createAction(actionTypes.SETTING_SHOW_DATA_REQUEST, (payload: Setting) => ({
	payload: payload
}));

export const settingShowDataSuccessAction = createAction(actionTypes.SETTING_SHOW_DATA_SUCCESS, (payload: Setting) => ({
	payload: payload
}));

export const settingShowLoadingRequestAction = createAction(actionTypes.SETTING_SHOW_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const settingShowLoadingSuccessAction = createAction(actionTypes.SETTING_SHOW_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const settingUpdateDataRequestAction = createAction(actionTypes.SETTING_UPDATE_DATA_REQUEST, (payload: Setting) => ({
	payload: payload
}));

export const settingUpdateDataSuccessAction = createAction(actionTypes.SETTING_UPDATE_DATA_SUCCESS, (payload: Setting) => ({
	payload: payload
}));

export const settingUpdateLoadingRequestAction = createAction(actionTypes.SETTING_UPDATE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const settingUpdateLoadingSuccessAction = createAction(actionTypes.SETTING_UPDATE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));
