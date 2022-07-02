import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { dashboardShowDataRequestAction, dashboardShowDataSuccessAction, dashboardShowLoadingRequestAction, dashboardShowLoadingSuccessAction } from './actions';

export const dashboardShowDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(dashboardShowDataRequestAction.match),
		map((action) => dashboardShowDataSuccessAction(action.payload))
	);

export const dashboardShowLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(dashboardShowLoadingRequestAction.match),
		map((action) => dashboardShowLoadingSuccessAction(action.payload))
	);
