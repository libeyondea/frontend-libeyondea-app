import BreadcrumbComponent from 'common/components/Breadcrumb/components';
import CardComponent from 'common/components/Card/components';
import LinkComponent from 'common/components/Link/components';
import Loadingomponent from 'common/components/Loading/components';
import time from 'helpers/time';
import { User } from 'models/user';
import { useEffect, useState } from 'react';
import userService from 'services/userService';
import * as routeConstant from 'constants/route';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import classNames from 'classnames';

type Props = {};

const ListUserComponent: React.FC<Props> = () => {
	const [isLoading, setLoading] = useState(false);
	const [data, setData] = useState<User[]>([]);

	useEffect(() => {
		setLoading(true);
		userService
			.list()
			.then((response) => {
				setData(response.data.data);
			})
			.catch((error) => {})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<>
			<BreadcrumbComponent className="mb-4">List users</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent header="List users">
						{isLoading ? (
							<Loadingomponent />
						) : (
							<div className="flex flex-col">
								<div className="overflow-x-auto">
									<div className="align-middle inline-block min-w-full">
										<div className="overflow-hidden border-2 border-gray-200 rounded-md">
											<table className="min-w-full divide-y divide-gray-200">
												<thead className="bg-gray-50">
													<tr>
														<th
															scope="col"
															className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
														>
															Name
														</th>

														<th
															scope="col"
															className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
														>
															Status
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
														>
															Role
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
														>
															Updated at
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider"
														>
															Created at
														</th>
														<th scope="col" className="relative px-6 py-3">
															<span className="sr-only">Action</span>
														</th>
													</tr>
												</thead>
												<tbody className="bg-white divide-y divide-gray-200">
													{!data.length ? (
														<tr>
															<td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center">
																Empty user
															</td>
														</tr>
													) : (
														data.map((user) => (
															<tr key={user.id}>
																<td className="px-6 py-4 whitespace-nowrap">
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
																				{user.first_name} {user.last_name} (
																				{user.user_name})
																			</div>
																			<div className="text-sm text-gray-500">
																				{user.email}
																			</div>
																		</div>
																	</div>
																</td>
																<td className="px-6 py-4 whitespace-nowrap">
																	<span
																		className={classNames(
																			'px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize',
																			{
																				'bg-green-100 text-green-800':
																					user.status === 'active',
																				'bg-red-100 text-red-800':
																					user.status === 'inactive',
																				'bg-yellow-100 text-yellow-800':
																					user.status === 'banned'
																			}
																		)}
																	>
																		{user.status}
																	</span>
																</td>
																<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
																	{user.role}
																</td>
																<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
																	{time.ago(user.updated_at)}
																</td>
																<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
																	{time.format(user.created_at)}
																</td>
																<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
																		>
																			<FaRegTrashAlt className="h-5 w-5" />
																		</button>
																	</div>
																</td>
															</tr>
														))
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						)}
					</CardComponent>
				</div>
			</div>
		</>
	);
};

export default ListUserComponent;
