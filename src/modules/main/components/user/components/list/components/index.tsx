import { Fragment, useCallback, useState } from 'react';

import FilterListUserComponent from './filter';
import ListUserRouter from './router';
import BadgeComponent from 'src/components/Badge/components';
import BlockUIComponent from 'src/components/BlockUI/components';
import BreadcrumbComponent from 'src/components/Breadcrumb/components';
import CardComponent from 'src/components/Card/components';
import { EditIconComponent, TrashIconComponent } from 'src/components/Icon/components';
import LinkComponent from 'src/components/Link/components';
import { TableLoadingComponent } from 'src/components/Loading/components';
import ModalComponent from 'src/components/Modal/components';
import PaginationComponent from 'src/components/Pagination/components';
import TableComponent from 'src/components/Table/components';
import * as routeConstant from 'src/constants/route';
import errorHandler from 'src/helpers/errorHandler';
import time from 'src/helpers/time';
import toastify from 'src/helpers/toastify';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useOnceEffect from 'src/hooks/useOnceEffect';
import useUpdateEffect from 'src/hooks/useUpdateEffect';
import userService from 'src/services/userService';
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

const ListUserComponent = () => {
	const [id, setId] = useState<number | null>(null);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useAppDispatch();
	const userList = useAppSelector(selectUserList);
	const userDelete = useAppSelector(selectUserDelete);

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
			<BreadcrumbComponent className="mb-4">List users</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent title="List users">
						<div className="relative">
							<FilterListUserComponent />
							{userList.loading ? (
								<TableLoadingComponent />
							) : (
								<TableComponent>
									<TableComponent.Thead>
										<TableComponent.Tr>
											<TableComponent.Th>User</TableComponent.Th>
											<TableComponent.Th>Actived</TableComponent.Th>
											<TableComponent.Th>Role</TableComponent.Th>
											<TableComponent.Th>Updated at</TableComponent.Th>
											<TableComponent.Th>Created at</TableComponent.Th>
											<TableComponent.Th>
												<span className="sr-only">Action</span>
											</TableComponent.Th>
										</TableComponent.Tr>
									</TableComponent.Thead>
									<TableComponent.Tbody>
										{!userList.data.length ? (
											<TableComponent.Tr>
												<TableComponent.Td className="text-center" colSpan={6}>
													No data.
												</TableComponent.Td>
											</TableComponent.Tr>
										) : (
											userList.data.map((user) => (
												<TableComponent.Tr key={user.id}>
													<TableComponent.Td>
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
													</TableComponent.Td>
													<TableComponent.Td>
														<BadgeComponent className="capitalize" styleType={user.actived ? 'success' : 'danger'}>
															{user.actived.toString()}
														</BadgeComponent>
													</TableComponent.Td>
													<TableComponent.Td>{user.role}</TableComponent.Td>
													<TableComponent.Td className="whitespace-nowrap">{time.ago(user.updated_at)}</TableComponent.Td>
													<TableComponent.Td className="whitespace-nowrap">{time.format(user.created_at)}</TableComponent.Td>
													<TableComponent.Td>
														<div className="flex items-center">
															<LinkComponent
																to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}/${user.id}/${routeConstant.ROUTE_NAME_MAIN_USER_EDIT}`}
																className="text-indigo-600 hover:text-indigo-900 mr-2"
															>
																<EditIconComponent className="h-5 w-5" />
															</LinkComponent>
															<button
																type="button"
																className="text-red-600 hover:text-red-900"
																onClick={() => {
																	setId(user.id);
																	setShowModal(true);
																}}
															>
																<TrashIconComponent className="h-5 w-5" />
															</button>
														</div>
													</TableComponent.Td>
												</TableComponent.Tr>
											))
										)}
									</TableComponent.Tbody>
								</TableComponent>
							)}
							<PaginationComponent
								page={userList.pagination.page}
								limit={userList.pagination.limit}
								total={userList.pagination.total}
								onChangePage={onChangePage}
								onChangeLimit={onChangeLimit}
							/>
							<BlockUIComponent blocked={userDelete.loading} />
						</div>
					</CardComponent>
				</div>
			</div>
			<ModalComponent
				title="Do you want to delete this user?"
				show={showModal}
				setShow={setShowModal}
				onClick={() => id && onClickDelete(id)}
				styleType="danger"
			/>
			<ListUserRouter />
		</Fragment>
	);
};

export default ListUserComponent;
