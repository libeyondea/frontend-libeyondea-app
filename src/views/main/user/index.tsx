import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SortSearchUser from './components/SortSearchUser';
import Badge from 'src/components/Badge';
import Card from 'src/components/Card';
import Image from 'src/components/Image';
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
import { User } from 'src/types/user';
import errorHandler from 'src/utils/errorHandler';
import time from 'src/utils/time';
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
					<Table<User>
						columns={['avatar', 'first_name', 'last_name', 'user_name', 'email', 'role', 'actived', 'updated_at', 'created_at', 'action']}
						data={userList.data}
						loading={userList.loading}
						action={{
							onClickEdit: (id) => navigate(`/${routeConstant.ROUTE_NAME_USER}/${id}/${routeConstant.ROUTE_NAME_USER_EDIT}`),
							onClickDelete: onClickDelete
						}}
						columnCell={(key, value, row) => {
							return key === 'avatar' ? (
								<div className="avatar">
									<div className="mask mask-squircle w-12 h-12">
										<Image className="h-10 w-10 rounded-full" src={value} alt={row.user_name} />
									</div>
								</div>
							) : key === 'actived' ? (
								<Badge className="capitalize" colorType={value ? 'success' : 'danger'}>
									{value.toString()}
								</Badge>
							) : key === 'role' ? (
								<div className="capitalize">{value}</div>
							) : key === 'updated_at' ? (
								time.ago(value)
							) : key === 'created_at' ? (
								time.format(value)
							) : (
								value
							);
						}}
					/>
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
