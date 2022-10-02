import _ from 'lodash';
import { Fragment, useCallback, useState } from 'react';

import FilterUser from './components/FilterUser';
import Badge from 'src/components/Badge';
import BlockUI from 'src/components/BlockUI';
import Breadcrumb from 'src/components/Breadcrumb';
import Card from 'src/components/Card';
import { EditIcon, TrashIcon } from 'src/components/Icon';
import Link from 'src/components/Link';
import { TableLoading } from 'src/components/Loading';
import Modal from 'src/components/Modal';
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
	userListPaginationLimitRequestAction,
	userListPaginationPageRequestAction,
	userListPaginationTotalRequestAction
} from 'src/store/user/actions';
import { selectUserDelete, selectUserList } from 'src/store/user/selectors';
import errorHandler from 'src/utils/errorHandler';
import time from 'src/utils/time';
import toastify from 'src/utils/toastify';

const UserPage = () => {
	const [id, setId] = useState<number | null>(null);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const userList = useSelector(selectUserList);
	const userDelete = useSelector(selectUserDelete);

	const onChangePage = (page: number) => {
		dispatch(userListPaginationPageRequestAction(page));
	};

	const onChangeLimit = (limit: number) => {
		dispatch(userListPaginationPageRequestAction(1));
		dispatch(userListPaginationLimitRequestAction(limit));
	};

	const onClickDelete = (id: number) => {
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
	};

	const userListDataCallback = useCallback(() => {
		dispatch(userListLoadingRequestAction(true));
		const payload = {
			page: userList.pagination.page,
			limit: userList.pagination.limit,
			q: userList.filter.q,
			sort_by: userList.filter.sort_by,
			sort_direction: userList.filter.sort_direction
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
	}, [dispatch, userList.filter.q, userList.filter.sort_by, userList.filter.sort_direction, userList.pagination.limit, userList.pagination.page]);

	useOnceEffect(() => {
		userListDataCallback();
	});

	useUpdateEffect(() => {
		userListDataCallback();
	}, [userListDataCallback]);

	return (
		<Fragment>
			<Breadcrumb className="mb-4">List users</Breadcrumb>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<Card title="List users">
						<div className="relative">
							<FilterUser />
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
														<div className="flex items-center">
															<div className="flex-shrink-0 h-10 w-10">
																<img className="h-10 w-10 rounded-full" src={user.avatar_url} alt={user.user_name} />
															</div>
															<div className="ml-4">
																<div className="text-sm font-medium text-gray-900">
																	{user.first_name} {user.last_name} ({user.user_name})
																</div>
																<div className="text-sm text-gray-500">{user.email}</div>
															</div>
														</div>
													</Table.Td>
													<Table.Td>
														<Badge className="capitalize" styleType={user.actived ? 'success' : 'danger'}>
															{user.actived.toString()}
														</Badge>
													</Table.Td>
													<Table.Td>{user.role}</Table.Td>
													<Table.Td className="whitespace-nowrap">{time.ago(user.updated_at)}</Table.Td>
													<Table.Td className="whitespace-nowrap">{time.format(user.created_at)}</Table.Td>
													<Table.Td>
														<div className="flex items-center">
															<Link
																to={`/${routeConstant.ROUTE_NAME_USER}/${user.id}/${routeConstant.ROUTE_NAME_USER_EDIT}`}
																className="text-indigo-600 hover:text-indigo-900 mr-2"
															>
																<EditIcon className="h-5 w-5" />
															</Link>
															<button
																type="button"
																className="text-red-600 hover:text-red-900"
																onClick={() => {
																	setId(user.id);
																	setShowModal(true);
																}}
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
								limit={userList.pagination.limit}
								total={userList.pagination.total}
								onChangePage={onChangePage}
								onChangeLimit={onChangeLimit}
							/>
							<BlockUI blocked={userDelete.loading} />
						</div>
					</Card>
				</div>
			</div>
			<Modal title="Do you want to delete this user?" show={showModal} setShow={setShowModal} onClick={() => id && onClickDelete(id)} styleType="danger" />
		</Fragment>
	);
};

export default UserPage;
