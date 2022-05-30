import BreadcrumbComponent from 'components/Breadcrumb/components';
import CardComponent from 'components/Card/components';
import LinkComponent from 'components/Link/components';
import time from 'helpers/time';
import { Fragment, useEffect } from 'react';
import userService from 'services/userService';
import * as routeConstant from 'constants/route';
import * as userConstant from 'constants/user';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import classNames from 'classnames';
import PaginationComponent from 'components/Pagination/components';
import TableLoadingComponent from 'components/TableLoading/components';
import BlockUIComponent from 'components/BlockUI/components';
import TableComponent from 'components/Table/components';
import { errorHandler } from 'helpers/error';
import { useRoutes } from 'react-router-dom';
import ListUserRouter from './router';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { selectUserDelete, selectUserList } from 'store/user/selectors';
import {
	userDeleteDataRequestAction,
	userDeleteLoadingRequestAction,
	userListDataRequestAction,
	userListLoadingRequestAction,
	userListPaginationLimitRequestAction,
	userListPaginationPageRequestAction,
	userListPaginationTotalRequestAction
} from 'store/user/actions';
import FilterListUserComponent from './filter';
import useDebounce from 'hooks/useDebounce';

type Props = {};

const ListUserComponent: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const userList = useAppSelector(selectUserList);
	const userDelete = useAppSelector(selectUserDelete);
	const userListFilterQ = useDebounce(userList.filter.q, 666);

	const onChangePage = (page: number) => {
		dispatch(userListPaginationPageRequestAction(page));
	};

	const onChangeLimit = (limit: number) => {
		dispatch(userListPaginationPageRequestAction(1));
		dispatch(userListPaginationLimitRequestAction(limit));
	};

	const onClickDelete = (id: number) => {
		if (window.confirm('Do you want to delete?')) {
			dispatch(userDeleteLoadingRequestAction(true));
			userService
				.delete(id)
				.then((response) => {
					dispatch(userDeleteDataRequestAction(response.data.data));
				})
				.catch(errorHandler())
				.finally(() => {
					dispatch(userDeleteLoadingRequestAction(false));
				});
		}
	};

	useEffect(() => {
		dispatch(userListLoadingRequestAction(true));
		const payload = {
			page: userList.pagination.page,
			limit: userList.pagination.limit,
			q: userListFilterQ,
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
	}, [
		dispatch,
		userList.pagination.page,
		userList.pagination.limit,
		userListFilterQ,
		userList.filter.sort_by,
		userList.filter.sort_direction
	]);

	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">List users</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent header="List users">
						<div className="relative">
							<FilterListUserComponent />
							{userList.is_loading ? (
								<TableLoadingComponent />
							) : (
								<TableComponent>
									<TableComponent.Thead>
										<TableComponent.Tr>
											<TableComponent.Th>User</TableComponent.Th>
											<TableComponent.Th>Status</TableComponent.Th>
											<TableComponent.Th>Role</TableComponent.Th>
											<TableComponent.Th>Updated at</TableComponent.Th>
											<TableComponent.Th>Created at</TableComponent.Th>
											<TableComponent.Th>
												<span className="sr-only">Action</span>
											</TableComponent.Th>
										</TableComponent.Tr>
									</TableComponent.Thead>
									<TableComponent.Tbody>
										<Fragment>
											{!userList.data.length ? (
												<TableComponent.Tr>
													<TableComponent.Td className="text-center" colSpan={6}>
														Empty users
													</TableComponent.Td>
												</TableComponent.Tr>
											) : (
												userList.data.map((user) => (
													<TableComponent.Tr key={user.id}>
														<TableComponent.Td>
															<div className="flex items-center">
																<div className="flex-shrink-0 h-10 w-10">
																	<img
																		className="h-10 w-10 rounded-full"
																		src={user.avatar_url}
																		alt={user.user_name}
																	/>
																</div>
																<div className="ml-4">
																	<div className="text-sm font-medium text-gray-900">
																		{user.last_name} {user.first_name} ({user.user_name})
																	</div>
																	<div className="text-sm text-gray-500">{user.email}</div>
																</div>
															</div>
														</TableComponent.Td>
														<TableComponent.Td>
															<span
																className={classNames(
																	'px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize',
																	{
																		'bg-green-100 text-green-800':
																			user.status === userConstant.USER_STATUS_ACTIVE,
																		'bg-yellow-100 text-yellow-800':
																			user.status === userConstant.USER_STATUS_INACTIVE,
																		'bg-red-100 text-red-800':
																			user.status === userConstant.USER_STATUS_BANNED
																	}
																)}
															>
																{user.status}
															</span>
														</TableComponent.Td>
														<TableComponent.Td>{user.role}</TableComponent.Td>
														<TableComponent.Td className="whitespace-nowrap">
															{time.ago(user.updated_at)}
														</TableComponent.Td>
														<TableComponent.Td className="whitespace-nowrap">
															{time.format(user.created_at)}
														</TableComponent.Td>
														<TableComponent.Td>
															<div className="flex items-center">
																<LinkComponent
																	to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}/${user.id}/${routeConstant.ROUTE_NAME_MAIN_USER_EDIT}`}
																	className="text-indigo-600 hover:text-indigo-900 mr-2"
																>
																	<FaRegEdit className="h-5 w-5" />
																</LinkComponent>
																<button
																	type="button"
																	className="text-red-600 hover:text-red-900"
																	onClick={() => onClickDelete(user.id)}
																>
																	<FaRegTrashAlt className="h-5 w-5" />
																</button>
															</div>
														</TableComponent.Td>
													</TableComponent.Tr>
												))
											)}
										</Fragment>
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
							<BlockUIComponent isBlocking={userDelete.is_loading} />
						</div>
					</CardComponent>
				</div>
			</div>
			{useRoutes(ListUserRouter)}
		</Fragment>
	);
};

export default ListUserComponent;
