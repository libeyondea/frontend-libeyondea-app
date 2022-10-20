import _ from 'lodash';
import { useCallback } from 'react';

import SortSearchUser from './components/SortSearchUser';
import Badge from 'src/components/Badge';
import Card from 'src/components/Card';
import { EditIcon, TrashIcon } from 'src/components/Icon';
import Image from 'src/components/Image';
import Link from 'src/components/Link';
import { TableLoading } from 'src/components/Loading';
import Pagination from 'src/components/Pagination';
import Table from 'src/components/Table';
import * as routeConstant from 'src/constants/route';
import useOnceEffect from 'src/hooks/useOnceEffect';
import useUpdateEffect from 'src/hooks/useUpdateEffect';
import userService from 'src/services/userService';
import { useDispatch, useSelector } from 'src/store';
import {
	userDeleteDataRequestAction,
	userDeleteLoadingRequestAction,
	userListDataRequestAction,
	userListLoadingRequestAction,
	userListPaginationPageRequestAction,
	userListPaginationPageSizeRequestAction,
	userListPaginationTotalRequestAction
} from 'src/store/user/actions';
import { selectUserDelete, selectUserList } from 'src/store/user/selectors';
import errorHandler from 'src/utils/errorHandler';
import time from 'src/utils/time';
import toastify from 'src/utils/toastify';

const UserPage = () => {
	const dispatch = useDispatch();
	const userList = useSelector(selectUserList);
	const userDelete = useSelector(selectUserDelete);

	const onChangePage = (page: number) => {
		dispatch(userListPaginationPageRequestAction(page));
	};

	const onChangePageSize = (pageSize: number) => {
		dispatch(userListPaginationPageRequestAction(1));
		dispatch(userListPaginationPageSizeRequestAction(pageSize));
	};

	const onClickDelete = (id: number) => {
		if (window.confirm('Do you want to delete item?')) {
			dispatch(userDeleteLoadingRequestAction(true));
			userService
				.delete(id)
				.then((response) => {
					toastify.success('User deleted successfully.');
					dispatch(userDeleteDataRequestAction(response.data.data));
					userListDataCallback();
				})
				.catch(errorHandler())
				.finally(() => {
					dispatch(userDeleteLoadingRequestAction(false));
				});
		}
	};

	const userListDataCallback = useCallback(() => {
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
				dispatch(userListPaginationTotalRequestAction(response.data.pagination.total));
			})
			.catch(errorHandler())
			.finally(() => {
				dispatch(userListLoadingRequestAction(false));
			});
	}, [dispatch, userList.search, userList.sort_by, userList.sort_direction, userList.pagination.page_size, userList.pagination.page]);

	useOnceEffect(() => {
		userListDataCallback();
	});

	useUpdateEffect(() => {
		userListDataCallback();
	}, [userListDataCallback]);

	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="col-span-1">
				<Card title="List users">
					<SortSearchUser disabled={userDelete.loading} />
					{userList.loading ? (
						<TableLoading />
					) : (
						<Table>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>User</Table.Th>
									<Table.Th>Actived</Table.Th>
									<Table.Th>Role</Table.Th>
									<Table.Th>Updated at</Table.Th>
									<Table.Th>Created at</Table.Th>
									<Table.Th>
										<span className="sr-only">Action</span>
									</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{_.isEmpty(userList.data) ? (
									<Table.Tr>
										<Table.Td className="text-center" colSpan={6}>
											No data.
										</Table.Td>
									</Table.Tr>
								) : (
									userList.data.map((user) => (
										<Table.Tr key={user.id}>
											<Table.Td>
												<div className="flex items-center space-x-3">
													<div className="avatar">
														<div className="mask mask-squircle w-12 h-12">
															<Image className="h-10 w-10 rounded-full" src={user.avatar_url} alt={user.user_name} />
														</div>
													</div>
													<div>
														<div className="font-bold">
															{user.first_name} {user.last_name} ({user.user_name})
														</div>
														<div className="text-sm opacity-50">{user.email}</div>
													</div>
												</div>
											</Table.Td>
											<Table.Td>
												<Badge className="capitalize" colorType={user.actived ? 'success' : 'danger'}>
													{user.actived.toString()}
												</Badge>
											</Table.Td>
											<Table.Td className="capitalize">{user.role}</Table.Td>
											<Table.Td>{time.ago(user.updated_at)}</Table.Td>
											<Table.Td>{time.format(user.created_at)}</Table.Td>
											<Table.Td>
												<div className="flex items-center">
													<Link
														to={`/${routeConstant.ROUTE_NAME_USER}/${user.id}/${routeConstant.ROUTE_NAME_USER_EDIT}`}
														className="text-info hover:text-info-content mr-2"
													>
														<EditIcon className="h-5 w-5" />
													</Link>
													<button
														type="button"
														className="text-error hover:text-error-content"
														onClick={() => onClickDelete(user.id)}
														disabled={userDelete.loading}
													>
														<TrashIcon className="h-5 w-5" />
													</button>
												</div>
											</Table.Td>
										</Table.Tr>
									))
								)}
							</Table.Tbody>
						</Table>
					)}
					<Pagination
						page={userList.pagination.page}
						pageSize={userList.pagination.page_size}
						total={userList.pagination.total}
						onChangePage={onChangePage}
						onChangePageSize={onChangePageSize}
						disabled={userDelete.loading}
					/>
				</Card>
			</div>
		</div>
	);
};

export default UserPage;
