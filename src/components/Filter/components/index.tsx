import classNames from 'classnames';
import ButtonComponent from 'components/Button/components';
import FormComponent from 'components/Form/components';

type Props = {
	className?: string;
	filter: {
		q: string;
	};
	setFilter: React.Dispatch<
		React.SetStateAction<{
			q: string;
		}>
	>;
	onChangeSearch: (q: string) => void;
	onSubmitSearch: () => void;
};

const FilterComponent: React.FC<Props> = ({ className, filter, setFilter, onChangeSearch, onSubmitSearch }) => {
	const _onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const q = e.target.value;
		if (!q) {
			onChangeSearch(q);
		}
		setFilter({
			q: q
		});
	};

	const _onSubmitSearch = (e: React.SyntheticEvent) => {
		e.preventDefault();
		onSubmitSearch();
	};

	return (
		<div className={classNames('flex mb-4', className)}>
			<div className="flex items-center"></div>
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
