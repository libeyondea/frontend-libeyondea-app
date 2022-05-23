import classNames from 'classnames';

type Props = {
	className?: string;
	q: string;
	onChangeSearch: (q: string) => void;
	onSubmitSearch: () => void;
};

const FilterComponent: React.FC<Props> = ({ className, q, onChangeSearch, onSubmitSearch }) => {
	const _onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeSearch(e.target.value);
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
					<input
						type="text"
						placeholder="Enter keyword"
						className="mr-4 rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						value={q}
						onChange={_onChangeSearch}
						name="q"
						id="q"
					/>
					<button
						type="submit"
						className="flex items-center justify-center py-3 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
					>
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default FilterComponent;
