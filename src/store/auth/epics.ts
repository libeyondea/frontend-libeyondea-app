import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
	authCurrentDataTokenRequestAction,
	authCurrentDataTokenSuccessAction,
	authCurrentDataUserRequestAction,
	authCurrentDataUserSuccessAction
} from './actions';

export const authCurrentDataUserEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(authCurrentDataUserRequestAction.match),
		map((action) => authCurrentDataUserSuccessAction(action.payload))
	);

export const authCurrentDataTokenEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(authCurrentDataTokenRequestAction.match),
		map((action) => authCurrentDataTokenSuccessAction(action.payload))
	);
