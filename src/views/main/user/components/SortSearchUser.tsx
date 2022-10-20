import _ from 'lodash';
import { useMemo } from 'react';

import Form from 'src/components/Form';
import * as sortConstant from 'src/constants/sort';
import { useDispatch, useSelector } from 'src/store';
import {
	userListSearchRequestAction,
	userListSearchTempRequestAction,
	userListSortByRequestAction,
	userListSortDirectionRequestAction
} from 'src/store/user/actions';
import { selectUserList } from 'src/store/user/selectors';

type Props = {
	disabled?: boolean;
};

const SortSearchUser = ({ disabled = false }: Props) => {
	const dispatch = useDispatch();
	const userList = useSelector(selectUserList);

	const onChangeSearchDebounce = useMemo(() => _.debounce((value) => dispatch(userListSearchRequestAction(value)), 600), [dispatch]);

	const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(userListSortByRequestAction(event.target.value));
	};

	const onChangeSortDirection = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(userListSortDirectionRequestAction(event.target.value));
	};

	const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(userListSearchTempRequestAction(event.target.value));
		onChangeSearchDebounce(event.target.value);
	};

	return (
		<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
			<div className="flex sm:items-center flex-col sm:flex-row mb-4 md:mb-0">
				<Form.Select
					name="sort_by"
					label="Sort by"
					value={userList.sort_by}
					options={['first_name', 'last_name', 'user_name', 'email', 'actived', 'role', 'updated_at', 'created_at']}
					onChange={onChangeSortBy}
					className="mr-0 sm:mr-4 mb-4 sm:mb-0 sm:w-36 min-w-full sm:min-w-0"
					disabled={disabled}
				/>
				<Form.Select
					name="sort_direction"
					label="Sort direction"
					value={userList.sort_direction}
					options={[sortConstant.SORT_DIRECTION_ASC, sortConstant.SORT_DIRECTION_DESC]}
					onChange={onChangeSortDirection}
					className="sm:w-36 min-w-full sm:min-w-0"
					disabled={disabled}
				/>
			</div>
			<div className="flex sm:items-center flex-col sm:flex-row">
				<Form.Input
					name="search"
					label="Search"
					value={userList.search_temp}
					onChange={onChangeSearch}
					className="min-w-full sm:w-72 sm:min-w-0"
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default SortSearchUser;
