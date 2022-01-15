import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@reduxjs/toolkit';
import { authCurrentRequestAction, authCurrentSuccessAction } from './actions';

export const authCurrentEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(authCurrentRequestAction.match),
		map((action) => authCurrentSuccessAction(action.payload.user, action.payload.token))
	);
