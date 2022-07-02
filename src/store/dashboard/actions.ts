import { createAction } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';
import { Dashboard } from 'src/types/dashboard';

export const dashboardShowDataRequestAction = createAction(actionTypes.DASHBOARD_SHOW_DATA_REQUEST, (payload: Dashboard) => ({
	payload: payload
}));

export const dashboardShowDataSuccessAction = createAction(actionTypes.DASHBOARD_SHOW_DATA_SUCCESS, (payload: Dashboard) => ({
	payload: payload
}));

export const dashboardShowLoadingRequestAction = createAction(actionTypes.DASHBOARD_SHOW_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const dashboardShowLoadingSuccessAction = createAction(actionTypes.DASHBOARD_SHOW_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));
