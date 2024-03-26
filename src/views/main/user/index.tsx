import _ from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Badge from 'src/components/Badge';
import Card from 'src/components/Card';
import Image from 'src/components/Image';
import Table from 'src/components/Table';
import * as routeConstant from 'src/constants/route';
import userService from 'src/services/userService';
import { useDispatch, useSelector } from 'src/store';
import {
	userDeleteDataRequestAction,
	userDeleteLoadingRequestAction,
	userListColumnRequestAction,
	userListDataRequestAction,
	userListLoadingRequestAction,
	userListPaginationPageRequestAction,
	userListPaginationPageSizeRequestAction,
	userListPaginationTotalRequestAction,
	userListSearchRequestAction,
	userListSearchTempRequestAction,
	userListSortByRequestAction,
	userListSortDirectionRequestAction
} from 'src/store/user/actions';
import { selectUserDelete, selectUserList } from 'src/store/user/selectors';
import { User } from 'src/types/user';
import errorHandler from 'src/utils/errorHandler';
import toastify from 'src/utils/toastify';

const UserPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userList = useSelector(selectUserList);
	const userDelete = useSelector(selectUserDelete);

	const onChangePage = (page: number) => {
		dispatch(userListPaginationPageRequestAction(page));
	};

	const onChangePageSize = (pageSize: number) => {
		dispatch(userListPaginationPageRequestAction(1));
		dispatch(userListPaginationPageSizeRequestAction(pageSize));
	};

	const onChangeSortBy = (sortBy: string) => {
		dispatch(userListSortByRequestAction(sortBy));
	};

	const onChangeSortDirection = (sortDirection: string) => {
		dispatch(userListSortDirectionRequestAction(sortDirection));
	};

	const onChangeSearch = useMemo(() => _.debounce((search: string) => dispatch(userListSearchRequestAction(search)), 600), [dispatch]);

	const onChangeSearchTemp = (searchTemp: string) => {
		dispatch(userListSearchTempRequestAction(searchTemp));
	};

	const onClickEdit = (id: number) => {
		navigate(`/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_EDIT}?id=${id}`);
	};

	const onClickDelete = (id: number) => {
		if (window.confirm('Do you want to delete item?')) {
			dispatch(userDeleteLoadingRequestAction(true));
			userService
				.delete(id)
				.then((response) => {
					toastify.success('User deleted successfully.');
					dispatch(userDeleteDataRequestAction(response.data.data));
					userListCallback();
				})
				.catch(errorHandler())
				.finally(() => {
					dispatch(userDeleteLoadingRequestAction(false));
				});
		}
	};

	const userListCallback = useCallback(() => {
		dispatch(userListLoadingRequestAction(true));
		const payload = {
			page: userList.pagination.page,
			page_size: userList.pagination.page_size,
			sort_by: userList.sort_by,
			sort_direction: userList.sort_direction,
			search: userList.search
		};
		userService
			.list(payload)
			.then((response) => {
				dispatch(userListDataRequestAction(response.data.data));
				dispatch(userListColumnRequestAction(response.data.columns));
				dispatch(userListPaginationTotalRequestAction(response.data.pagination.total));
			})
			.catch(errorHandler())
			.finally(() => {
				dispatch(userListLoadingRequestAction(false));
			});
	}, [dispatch, userList.pagination.page, userList.pagination.page_size, userList.sort_by, userList.sort_direction, userList.search]);

	useEffect(() => {
		userListCallback();
	}, [userListCallback]);

	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="col-span-1">
				<Card>
					<Card.Body>
						<Card.Title>List users</Card.Title>
						<Card.Content>
							<Table<User>
								hiddenColumns={['id']}
								columns={userList.columns}
								data={userList.data}
								loading={userList.loading}
								disabled={userDelete.loading}
								action={{
									onClickEdit: onClickEdit,
									onClickDelete: onClickDelete
								}}
								toolBar={{
									sortBy: userList.sort_by,
									sortByOptions: userList.columns,
									sortDirection: userList.sort_direction,
									searchTemp: userList.search_temp,
									onChangeSortBy: onChangeSortBy,
									onChangeSortDirection: onChangeSortDirection,
									onChangeSearch: onChangeSearch,
									onChangeSearchTemp: onChangeSearchTemp
								}}
								pagination={{
									page: userList.pagination.page,
									pageSize: userList.pagination.page_size,
									total: userList.pagination.total,
									onChangePage: onChangePage,
									onChangePageSize: onChangePageSize
								}}
								columnCell={(key, value, row) => {
									return key === 'avatar' ? (
										<div className="avatar">
											<div className="mask mask-squircle h-12 w-12">
												<Image className="h-10 w-10 rounded-full" src={_.toString(value)} alt={_.toString(row.user_name)} />
											</div>
										</div>
									) : key === 'role' ? (
										_.capitalize(_.toString(value))
									) : key === 'status' ? (
										<Badge color={value ? 'success' : 'error'}>{value ? 'Active' : 'Deactive'}</Badge>
									) : (
										_.toString(value)
									);
								}}
							/>
						</Card.Content>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default UserPage;
