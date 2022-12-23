import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { appInitializedRequestAction, appInitializedSuccessAction, appSidebarRequestAction, appSidebarSuccessAction } from './actions';

export const appInitializedEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(appInitializedRequestAction.match),
		map((action) => appInitializedSuccessAction(action.payload.initialized))
	);

export const appSidebarEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(appSidebarRequestAction.match),
		map((action: any) => appSidebarSuccessAction(action.payload.sidebar))
	);
