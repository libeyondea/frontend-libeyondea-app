import { createAction } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';
import { User } from 'src/types/user';

export const userListDataRequestAction = createAction(actionTypes.USER_LIST_DATA_REQUEST, (payload: User[]) => ({
	payload: payload
}));

export const userListDataSuccessAction = createAction(actionTypes.USER_LIST_DATA_SUCCESS, (payload: User[]) => ({
	payload: payload
}));

export const userListColumnRequestAction = createAction(actionTypes.USER_LIST_COLUMN_REQUEST, (payload: string[]) => ({
	payload: payload
}));

export const userListColumnSuccessAction = createAction(actionTypes.USER_LIST_COLUMN_SUCCESS, (payload: string[]) => ({
	payload: payload
}));

export const userListPaginationPageRequestAction = createAction(actionTypes.USER_LIST_PAGINATION_PAGE_REQUEST, (payload: number) => ({
	payload: payload
}));

export const userListPaginationPageSuccessAction = createAction(actionTypes.USER_LIST_PAGINATION_PAGE_SUCCESS, (payload: number) => ({
	payload: payload
}));

export const userListPaginationPageSizeRequestAction = createAction(actionTypes.USER_LIST_PAGINATION_PAGE_SIZE_REQUEST, (payload: number) => ({
	payload: payload
}));

export const userListPaginationPageSizeSuccessAction = createAction(actionTypes.USER_LIST_PAGINATION_PAGE_SIZE_SUCCESS, (payload: number) => ({
	payload: payload
}));

export const userListPaginationTotalRequestAction = createAction(actionTypes.USER_LIST_PAGINATION_TOTAL_REQUEST, (payload: number) => ({
	payload: payload
}));

export const userListPaginationTotalSuccessAction = createAction(actionTypes.USER_LIST_PAGINATION_TOTAL_SUCCESS, (payload: number) => ({
	payload: payload
}));

export const userListSortDirectionRequestAction = createAction(actionTypes.USER_LIST_SORT_DIRECTION_REQUEST, (payload: string) => ({
	payload: payload
}));

export const userListSortDirectionSuccessAction = createAction(actionTypes.USER_LIST_SORT_DIRECTION_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const userListSortByRequestAction = createAction(actionTypes.USER_LIST_SORT_BY_REQUEST, (payload: string) => ({
	payload: payload
}));

export const userListSortBySuccessAction = createAction(actionTypes.USER_LIST_SORT_BY_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const userListSearchRequestAction = createAction(actionTypes.USER_LIST_SEARCH_REQUEST, (payload: string) => ({
	payload: payload
}));

export const userListSearchSuccessAction = createAction(actionTypes.USER_LIST_SEARCH_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const userListSearchTempRequestAction = createAction(actionTypes.USER_LIST_SEARCH_TEMP_REQUEST, (payload: string) => ({
	payload: payload
}));

export const userListSearchTempSuccessAction = createAction(actionTypes.USER_LIST_SEARCH_TEMP_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const userListLoadingRequestAction = createAction(actionTypes.USER_LIST_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const userListLoadingSuccessAction = createAction(actionTypes.USER_LIST_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const userShowDataRequestAction = createAction(actionTypes.USER_SHOW_DATA_REQUEST, (payload: User) => ({
	payload: payload
}));

export const userShowDataSuccessAction = createAction(actionTypes.USER_SHOW_DATA_SUCCESS, (payload: User) => ({
	payload: payload
}));

export const userShowLoadingRequestAction = createAction(actionTypes.USER_SHOW_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const userShowLoadingSuccessAction = createAction(actionTypes.USER_SHOW_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const userCreateDataRequestAction = createAction(actionTypes.USER_CREATE_DATA_REQUEST, (payload: User) => ({
	payload: payload
}));

export const userCreateDataSuccessAction = createAction(actionTypes.USER_CREATE_DATA_SUCCESS, (payload: User) => ({
	payload: payload
}));

export const userCreateLoadingRequestAction = createAction(actionTypes.USER_CREATE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const userCreateLoadingSuccessAction = createAction(actionTypes.USER_CREATE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const userUpdateDataRequestAction = createAction(actionTypes.USER_UPDATE_DATA_REQUEST, (payload: User) => ({
	payload: payload
}));

export const userUpdateDataSuccessAction = createAction(actionTypes.USER_UPDATE_DATA_SUCCESS, (payload: User) => ({
	payload: payload
}));

export const userUpdateLoadingRequestAction = createAction(actionTypes.USER_UPDATE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const userUpdateLoadingSuccessAction = createAction(actionTypes.USER_UPDATE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const userDeleteDataRequestAction = createAction(actionTypes.USER_DELETE_DATA_REQUEST, (payload: User) => ({
	payload: payload
}));

export const userDeleteDataSuccessAction = createAction(actionTypes.USER_DELETE_DATA_SUCCESS, (payload: User) => ({
	payload: payload
}));

export const userDeleteLoadingRequestAction = createAction(actionTypes.USER_DELETE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const userDeleteLoadingSuccessAction = createAction(actionTypes.USER_DELETE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));
