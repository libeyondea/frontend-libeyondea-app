import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@reduxjs/toolkit';
import {
	settingUpdateDataRequestAction,
	settingUpdateDataSuccessAction,
	settingUpdateLoadingRequestAction,
	settingUpdateLoadingSuccessAction,
	settingShowDataRequestAction,
	settingShowDataSuccessAction,
	settingShowLoadingRequestAction,
	settingShowLoadingSuccessAction
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
