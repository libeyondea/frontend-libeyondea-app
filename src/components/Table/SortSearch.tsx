import Form from 'src/components/Form';
import * as sortConstant from 'src/constants/sort';

type Props = {
	sortBy: string;
	sortByOptions: string[];
	sortDirection: string;
	searchTemp: string;
	disabled?: boolean;
	onChangeSortBy: (sortBy: string) => void;
	onChangeSortDirection: (sortDirection: string) => void;
	onChangeSearch: (search: string) => void;
	onChangeSearchTemp: (searchTemp: string) => void;
};

const SortSearch = ({
	sortBy,
	sortByOptions,
	sortDirection,
	searchTemp,
	disabled = false,
	onChangeSortBy,
	onChangeSortDirection,
	onChangeSearch,
	onChangeSearchTemp
}: Props) => {
	const _onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChangeSortBy(event.target.value);
	};

	const _onChangeSortDirection = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChangeSortDirection(event.target.value);
	};

	const _onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChangeSearchTemp(event.target.value);
		onChangeSearch(event.target.value);
	};

	return (
		<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
			<div className="flex sm:items-center flex-col sm:flex-row mb-4 md:mb-0">
				<Form.Select
					name="sort_by"
					label="Sort by"
					value={sortBy}
					options={sortByOptions}
					onChange={_onChangeSortBy}
					className="mr-0 sm:mr-4 mb-4 sm:mb-0 sm:w-36 min-w-full sm:min-w-0"
					disabled={disabled}
				/>
				<Form.Select
					name="sort_direction"
					label="Sort direction"
					value={sortDirection}
					options={[sortConstant.SORT_DIRECTION_ASC, sortConstant.SORT_DIRECTION_DESC]}
					onChange={_onChangeSortDirection}
					className="sm:w-36 min-w-full sm:min-w-0"
					disabled={disabled}
				/>
			</div>
			<div className="flex sm:items-center flex-col sm:flex-row">
				<Form.Input
					name="search"
					label="Search"
					value={searchTemp}
					onChange={_onChangeSearch}
					className="min-w-full sm:w-72 sm:min-w-0"
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default SortSearch;
