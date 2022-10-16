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
	userListFilterKeywordRequestAction,
	userListFilterKeywordSuccessAction,
	userListFilterKeywordTempRequestAction,
	userListFilterKeywordTempSuccessAction,
	userListFilterSortByRequestAction,
	userListFilterSortBySuccessAction,
	userListFilterSortDirectionRequestAction,
	userListFilterSortDirectionSuccessAction,
	userListLoadingRequestAction,
	userListLoadingSuccessAction,
	userListPaginationPageRequestAction,
	userListPaginationPageSizeRequestAction,
	userListPaginationPageSizeSuccessAction,
	userListPaginationPageSuccessAction,
	userListPaginationTotalRequestAction,
	userListPaginationTotalSuccessAction,
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

export const userListFilterKeywordEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListFilterKeywordRequestAction.match),
		map((action) => userListFilterKeywordSuccessAction(action.payload))
	);

export const userListFilterKeywordTempEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(userListFilterKeywordTempRequestAction.match),
		map((action) => userListFilterKeywordTempSuccessAction(action.payload))
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
