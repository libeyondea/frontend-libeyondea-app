import BreadcrumbComponent from 'components/Breadcrumb/components';
import CardComponent from 'components/Card/components';
import LinkComponent from 'components/Link/components';
import time from 'helpers/time';
import { User } from 'models/user';
import { useEffect, useState, Fragment, useCallback } from 'react';
import userService from 'services/userService';
import * as routeConstant from 'constants/route';
import * as userConstant from 'constants/user';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import classNames from 'classnames';
import PaginationComponent from 'components/Pagination/components';
import TableLoadingComponent from 'components/TableLoading/components';
import BlockUIComponent from 'components/BlockUI/components';
import FilterComponent from 'components/Filter/components';
import TableComponent from 'components/Table/components';
import { errorHandler } from 'helpers/error';

type Props = {};

const ListUserComponent: React.FC<Props> = () => {
	const [formSearch, setFormSearch] = useState({
		q: ''
	});

	const [state, setState] = useState<{
		data: {
			users: User[];
		};
		pagination: {
			users: {
				page: number;
				limit: number;
				limits: number[];
				total: number;
			};
		};
		filter: {
			users: {
				q: string;
			};
		};
		loading: {
			users: boolean;
		};
		deleting: {
			users: boolean;
		};
	}>({
		data: {
			users: []
		},
		pagination: {
			users: {
				page: 1,
				limit: 10,
				limits: [10, 20, 50, 100],
				total: 0
			}
		},
		filter: {
			users: {
				q: ''
			}
		},
		loading: {
			users: true
		},
		deleting: {
			users: false
		}
	});

	const onChangePage = (page: number) => {
		setState((prevState) => ({
			...prevState,
			pagination: {
				...prevState.pagination,
				users: {
					...prevState.pagination.users,
					page: page
				}
			}
		}));
	};

	const onChangeLimit = (limit: number) => {
		setState((prevState) => ({
			...prevState,
			pagination: {
				...prevState.pagination,
				users: {
					...prevState.pagination.users,
					limit: limit,
					page: 1
				}
			}
		}));
	};

	const onChangeSearch = (q: string) => {
		if (!q) {
			setState((prevState) => ({
				...prevState,
				filter: {
					...prevState.filter,
					users: {
						...prevState.filter.users,
						q: ''
					}
				},
				pagination: {
					...prevState.pagination,
					users: {
						...prevState.pagination.users,
						page: 1
					}
				}
			}));
		}
		setFormSearch({
			q: q
		});
	};

	const onSubmitSearch = () => {
		setState((prevState) => ({
			...prevState,
			filter: {
				...prevState.filter,
				users: {
					...prevState.filter.users,
					q: formSearch.q
				}
			},
			pagination: {
				...prevState.pagination,
				users: {
					...prevState.pagination.users,
					page: 1
				}
			}
		}));
	};

	const loadUsers = useCallback(() => {
		setState((prevState) => ({
			...prevState,
			loading: {
				...prevState.loading,
				users: true
			}
		}));
		userService
			.list(state.pagination.users.page, state.pagination.users.limit, state.filter.users.q)
			.then((response) => {
				setState((prevState) => ({
					...prevState,
					data: {
						...prevState.data,
						users: response.data.data
					},
					pagination: {
						...prevState.pagination,
						users: {
							...prevState.pagination.users,
							total: response.data.pagination.total
						}
					}
				}));
			})
			.catch(errorHandler())
			.finally(() => {
				setState((prevState) => ({
					...prevState,
					loading: {
						...prevState.loading,
						users: false
					}
				}));
			});
	}, [state.pagination.users.page, state.pagination.users.limit, state.filter.users.q]);

	const onDeleteClicked = (userId: number) => {
		if (window.confirm('Do you want to delete?')) {
			new Promise((resolve, reject) => {
				setState((prevState) => ({
					...prevState,
					deleting: {
						...prevState.deleting,
						users: true
					}
				}));
				userService
					.delete(userId)
					.then((response) => {
						return resolve(response);
					})
					.catch((error) => {
						return reject(error);
					})
					.finally(() => {
						setState((prevState) => ({
							...prevState,
							deleting: {
								...prevState.deleting,
								users: false
							}
						}));
					});
			})
				.then((result) => {
					loadUsers();
				})
				.catch(errorHandler())
				.finally(() => {});
		}
	};

	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">List users</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent header="List users">
						<div className="relative">
							<FilterComponent q={formSearch.q} onChangeSearch={onChangeSearch} onSubmitSearch={onSubmitSearch} />
							{state.loading.users ? (
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
											{!state.data.users.length ? (
												<TableComponent.Tr>
													<TableComponent.Td colSpan={6}>Empty users</TableComponent.Td>
												</TableComponent.Tr>
											) : (
												state.data.users.map((user) => (
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
														<TableComponent.Td>{time.ago(user.updated_at)}</TableComponent.Td>
														<TableComponent.Td>{time.format(user.created_at)}</TableComponent.Td>
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
																	onClick={() => onDeleteClicked(user.id)}
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
								limits={state.pagination.users.limits}
								total={state.pagination.users.total}
								limit={state.pagination.users.limit}
								currentPage={state.pagination.users.page}
								onChangePage={onChangePage}
								onChangeLimit={onChangeLimit}
							/>
							<BlockUIComponent isBlocking={state.deleting.users} />
						</div>
					</CardComponent>
				</div>
			</div>
		</Fragment>
	);
};

export default ListUserComponent;
