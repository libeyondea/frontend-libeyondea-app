import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@reduxjs/toolkit';
import {
	userListDataRequestAction,
	userListDataSuccessAction,
	userListFilterQRequestAction,
	userListFilterQSuccessAction,
	userListLoadingRequestAction,
	userListLoadingSuccessAction,
	userListPaginationLimitRequestAction,
	userListPaginationLimitSuccessAction,
	userListPaginationPageRequestAction,
	userListPaginationPageSuccessAction,
	userListPaginationTotalRequestAction,
	userListPaginationTotalSuccessAction,
	userDeleteLoadingRequestAction,
	userDeleteLoadingSuccessAction,
	userUpdateDataRequestAction,
	userUpdateDataSuccessAction,
	userUpdateLoadingRequestAction,
	userUpdateLoadingSuccessAction,
	userDeleteDataSuccessAction,
	userDeleteDataRequestAction,
	userShowDataRequestAction,
	userShowDataSuccessAction,
	userShowLoadingRequestAction,
	userShowLoadingSuccessAction,
	userCreateDataRequestAction,
	userCreateDataSuccessAction,
	userCreateLoadingRequestAction,
	userCreateLoadingSuccessAction,
	userListFilterSortDirectionRequestAction,
	userListFilterSortDirectionSuccessAction,
	userListFilterSortByRequestAction,
	userListFilterSortBySuccessAction
} from './actions';

export const userListDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListDataRequestAction.match),
		map((action) => userListDataSuccessAction(action.payload))
	);

export const userListFilterSortDirectionEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListFilterSortDirectionRequestAction.match),
		map((action) => userListFilterSortDirectionSuccessAction(action.payload))
	);

export const userListFilterSortByEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListFilterSortByRequestAction.match),
		map((action) => userListFilterSortBySuccessAction(action.payload))
	);

export const userListFilterQEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListFilterQRequestAction.match),
		map((action) => userListFilterQSuccessAction(action.payload))
	);

export const userListLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListLoadingRequestAction.match),
		map((action) => userListLoadingSuccessAction(action.payload))
	);

export const userListPaginationPageEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListPaginationPageRequestAction.match),
		map((action) => userListPaginationPageSuccessAction(action.payload))
	);

export const userListPaginationLimitEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListPaginationLimitRequestAction.match),
		map((action) => userListPaginationLimitSuccessAction(action.payload))
	);

export const userListPaginationTotalEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListPaginationTotalRequestAction.match),
		map((action) => userListPaginationTotalSuccessAction(action.payload))
	);

export const userShowDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userShowDataRequestAction.match),
		map((action) => userShowDataSuccessAction(action.payload))
	);

export const userShowLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userShowLoadingRequestAction.match),
		map((action) => userShowLoadingSuccessAction(action.payload))
	);

export const userCreateDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userCreateDataRequestAction.match),
		map((action) => userCreateDataSuccessAction(action.payload))
	);

export const userCreateLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userCreateLoadingRequestAction.match),
		map((action) => userCreateLoadingSuccessAction(action.payload))
	);

export const userUpdateDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userUpdateDataRequestAction.match),
		map((action) => userUpdateDataSuccessAction(action.payload))
	);

export const userUpdateLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userUpdateLoadingRequestAction.match),
		map((action) => userUpdateLoadingSuccessAction(action.payload))
	);

export const userDeleteDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userDeleteDataRequestAction.match),
		map((action) => userDeleteDataSuccessAction(action.payload))
	);

export const userDeleteLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userDeleteLoadingRequestAction.match),
		map((action) => userDeleteLoadingSuccessAction(action.payload))
	);
