import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
	userCreateDataRequestAction,
	userCreateDataSuccessAction,
	userCreateLoadingRequestAction,
	userCreateLoadingSuccessAction,
	userDeleteDataRequestAction,
	userDeleteDataSuccessAction,
	userDeleteLoadingRequestAction,
	userDeleteLoadingSuccessAction,
	userListDataRequestAction,
	userListDataSuccessAction,
	userListLoadingRequestAction,
	userListLoadingSuccessAction,
	userListPaginationPageRequestAction,
	userListPaginationPageSizeRequestAction,
	userListPaginationPageSizeSuccessAction,
	userListPaginationPageSuccessAction,
	userListPaginationTotalRequestAction,
	userListPaginationTotalSuccessAction,
	userListSearchRequestAction,
	userListSearchSuccessAction,
	userListSearchTempRequestAction,
	userListSearchTempSuccessAction,
	userListSortByRequestAction,
	userListSortBySuccessAction,
	userListSortDirectionRequestAction,
	userListSortDirectionSuccessAction,
	userShowDataRequestAction,
	userShowDataSuccessAction,
	userShowLoadingRequestAction,
	userShowLoadingSuccessAction,
	userUpdateDataRequestAction,
	userUpdateDataSuccessAction,
	userUpdateLoadingRequestAction,
	userUpdateLoadingSuccessAction
} from './actions';

export const userListDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListDataRequestAction.match),
		map((action) => userListDataSuccessAction(action.payload))
	);

export const userListSortDirectionEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListSortDirectionRequestAction.match),
		map((action) => userListSortDirectionSuccessAction(action.payload))
	);

export const userListSortByEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListSortByRequestAction.match),
		map((action) => userListSortBySuccessAction(action.payload))
	);

export const userListSearchEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListSearchRequestAction.match),
		map((action) => userListSearchSuccessAction(action.payload))
	);

export const userListSearchTempEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListSearchTempRequestAction.match),
		map((action) => userListSearchTempSuccessAction(action.payload))
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

export const userListPaginationPageSizeEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListPaginationPageSizeRequestAction.match),
		map((action) => userListPaginationPageSizeSuccessAction(action.payload))
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
