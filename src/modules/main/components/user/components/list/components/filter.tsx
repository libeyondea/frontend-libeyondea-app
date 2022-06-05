import FormComponent from 'components/Form/components';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { userListFilterQRequestAction, userListFilterSortByRequestAction, userListFilterSortDirectionRequestAction } from 'store/user/actions';
import { selectUserList } from 'store/user/selectors';
import * as filterConstant from 'constants/filter';
import { useState } from 'react';
import useDebouncedCallback from 'hooks/useDebouncedCallback';

type Props = {};

const FilterListUserComponent: React.FC<Props> = () => {
	const [q, setQ] = useState('');
	const dispatch = useAppDispatch();
	const userList = useAppSelector(selectUserList);
	const userListFilterSortByList = ['first_name', 'last_name', 'user_name', 'email', 'status', 'role', 'created_at', 'updated_at'];

	const userListFilterQDebounced = useDebouncedCallback((nextValue: string) => dispatch(userListFilterQRequestAction(nextValue)));

	const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(userListFilterSortByRequestAction(event.target.value));
	};

	const onChangeSortDirection = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(userListFilterSortDirectionRequestAction(event.target.value));
	};

	const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQ(event.target.value);
		userListFilterQDebounced(event.target.value);
	};

	return (
		<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
			<div className="flex sm:items-center flex-col sm:flex-row mb-4 md:mb-0">
				<FormComponent.Select
					className="mr-4 mb-4 sm:mb-0"
					classNameInput="capitalize"
					isHorizontal
					label="Sort by"
					onChange={onChangeSortBy}
					value={userList.filter.sort_by}
					name="sort_by"
					id="sort_by"
				>
					{userListFilterSortByList.map((sortBy, index) => (
						<option value={sortBy} key={index}>
							{sortBy}
						</option>
					))}
				</FormComponent.Select>
				<FormComponent.Select
					classNameInput="capitalize"
					isHorizontal
					label="Sort direction"
					onChange={onChangeSortDirection}
					value={userList.filter.sort_direction}
					name="sort_direction"
					id="sort_direction"
				>
					{[filterConstant.FILTER_SORT_DIRECTION_DESC, filterConstant.FILTER_SORT_DIRECTION_ASC].map((sortBy, index) => (
						<option value={sortBy} key={index}>
							{sortBy}
						</option>
					))}
				</FormComponent.Select>
			</div>
			<div className="flex items-center">
				<FormComponent.Input type="text" placeholder="Enter keyword" onChange={onChangeSearch} value={q} name="q" id="q" />
			</div>
		</div>
	);
};

export default FilterListUserComponent;
