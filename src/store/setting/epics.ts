import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
	settingShowDataRequestAction,
	settingShowDataSuccessAction,
	settingShowLoadingRequestAction,
	settingShowLoadingSuccessAction,
	settingUpdateDataRequestAction,
	settingUpdateDataSuccessAction,
	settingUpdateLoadingRequestAction,
	settingUpdateLoadingSuccessAction
} from './actions';

export const settingShowDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(settingShowDataRequestAction.match),
		map((action) => settingShowDataSuccessAction(action.payload))
	);

export const settingShowLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(settingShowLoadingRequestAction.match),
		map((action) => settingShowLoadingSuccessAction(action.payload))
	);

export const settingUpdateDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(settingUpdateDataRequestAction.match),
		map((action) => settingUpdateDataSuccessAction(action.payload))
	);

export const settingUpdateLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(settingUpdateLoadingRequestAction.match),
		map((action) => settingUpdateLoadingSuccessAction(action.payload))
	);
