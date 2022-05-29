import classNames from 'classnames';
import ButtonComponent from 'components/Button/components';
import FormComponent from 'components/Form/components';

type Props = {
	className?: string;
	filter: {
		q: string;
		sort_by: string;
		sort_by_list: string[];
	};
	setFilter: React.Dispatch<
		React.SetStateAction<{
			q: string;
			sort_by: string;
			sort_by_list: string[];
		}>
	>;
	onChangeSortBy: (sort_by: string) => void;
	onChangeSearch: (q: string) => void;
	onSubmitSearch: () => void;
};

const FilterComponent: React.FC<Props> = ({ className, filter, setFilter, onChangeSortBy, onChangeSearch, onSubmitSearch }) => {
	const _onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const q = e.target.value;
		if (!q) {
			onChangeSearch(q);
		}
		setFilter({
			...filter,
			q: q
		});
	};

	const _onChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const q = e.target.value;
		onChangeSortBy(q);
	};

	const _onSubmitSearch = (e: React.SyntheticEvent) => {
		e.preventDefault();
		onSubmitSearch();
	};

	return (
		<div className={classNames('flex mb-4', className)}>
			<div className="flex items-center">
				<FormComponent.Select onChange={_onChangeSortBy} value={filter.sort_by} name="sort_by" id="sort_by">
					{filter.sort_by_list.map((sortBy, index) => (
						<option value={sortBy} key={index}>
							{sortBy}
						</option>
					))}
				</FormComponent.Select>
			</div>
			<div className="ml-auto">
				<form onSubmit={_onSubmitSearch} className="flex">
					<FormComponent.Input
						type="text"
						placeholder="Enter keyword"
						className="mr-4"
						onChange={_onChangeSearch}
						value={filter.q}
						name="q"
						id="q"
					/>
					<ButtonComponent>Search</ButtonComponent>
				</form>
			</div>
		</div>
	);
};

export default FilterComponent;
