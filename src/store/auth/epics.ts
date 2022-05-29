import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@reduxjs/toolkit';
import {
	authCurrentDataRequestAction,
	authCurrentDataSuccessAction,
	authCurrentTokenRequestAction,
	authCurrentTokenSuccessAction
} from './actions';

export const authCurrentDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(authCurrentDataRequestAction.match),
		map((action) => authCurrentDataSuccessAction(action.payload))
	);

export const authCurrentTokenEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(authCurrentTokenRequestAction.match),
		map((action) => authCurrentTokenSuccessAction(action.payload))
	);
