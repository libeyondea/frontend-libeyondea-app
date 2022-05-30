import FormComponent from 'components/Form/components';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import {
	userListFilterQRequestAction,
	userListFilterSortByRequestAction,
	userListFilterSortDirectionRequestAction,
	userListPaginationPageRequestAction
} from 'store/user/actions';
import { selectUserList } from 'store/user/selectors';

type Props = {};

const FilterListUserComponent: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const userList = useAppSelector(selectUserList);

	const onChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(userListFilterSortByRequestAction(e.target.value));
	};

	const onChangeSortDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(userListFilterSortDirectionRequestAction(e.target.value));
	};

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(userListPaginationPageRequestAction(1));
		dispatch(userListFilterQRequestAction(e.target.value));
	};

	return (
		<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
			<div className="flex sm:items-center flex-col sm:flex-row mb-4 md:mb-0">
				<FormComponent.Select
					className="mr-4 mb-4 sm:mb-0"
					isHorizontal
					label="Sort by"
					onChange={onChangeSortBy}
					value={userList.filter.sort_by}
					name="sort_by"
					id="sort_by"
				>
					{['user_name', 'created_at'].map((sortBy, index) => (
						<option value={sortBy} key={index}>
							{sortBy}
						</option>
					))}
				</FormComponent.Select>
				<FormComponent.Select
					isHorizontal
					label="Sort direction"
					onChange={onChangeSortDirection}
					value={userList.filter.sort_direction}
					name="sort_direction"
					id="sort_direction"
				>
					{['desc', 'asc'].map((sortBy, index) => (
						<option value={sortBy} key={index}>
							{sortBy}
						</option>
					))}
				</FormComponent.Select>
			</div>
			<div className="flex items-center">
				<FormComponent.Input
					type="text"
					placeholder="Enter keyword"
					className="mr-4"
					onChange={onChangeSearch}
					value={userList.filter.q}
					name="q"
					id="q"
				/>
			</div>
		</div>
	);
};

export default FilterListUserComponent;
