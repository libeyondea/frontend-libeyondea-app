import classNames from 'classnames';
import { Fragment } from 'react';

import FormComponent from 'src/components/Form/components';
import {
	AngleDoubleLeftIconComponent,
	AngleDoubleRightIconComponent,
	AngleLeftIconComponent,
	AngleRightIconComponent,
	EllipsisHorizontalIconComponent
} from 'src/components/Icon/components';
import { getPageNumbers, getTotalPages } from 'src/helpers/pagination';

type Props = {
	className?: string;
	page: number;
	limit: number;
	total: number;
	limits?: number[];
	onChangePage: (page: number) => void;
	onChangeLimit: (limit: number) => void;
};

const PaginationComponent = ({ className, page, limit, total, limits = [10, 20, 50, 100], onChangePage, onChangeLimit }: Props) => {
	const totalPages = getTotalPages(total, limit);
	const pageNumbers = getPageNumbers(page, limit, total);

	const _onChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => {
		event.preventDefault();
		onChangePage(page);
	};

	const _onChangeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		onChangeLimit(parseInt(event.target.value));
	};

	return (
		<div className={classNames('mt-4 flex flex-col md:flex-row md:items-center md:justify-between', className)}>
			<div className="flex items-center justify-center flex-none mb-4 md:mb-0 mr-0 md:mr-4 text-base text-gray-600">
				<p>
					Showing <span className="font-medium">{limit * page - limit + 1}</span> to <span className="font-medium">{limit * page}</span> of{' '}
					<span className="font-medium">{total}</span> entries
				</p>
				<span className="mx-2"> | </span>
				<span className="text-gray-600 flex-none">
					<FormComponent.Select
						id="limits"
						name="limits"
						label="Limits"
						value={limit}
						horizontal
						onChange={(event) => _onChangeLimit(event)}
						options={limits.map((limit) => ({
							value: limit,
							label: limit
						}))}
					/>
				</span>
			</div>
			<div className="flex items-center justify-center">
				<nav className="relative inline-flex flex-wrap rounded-md -space-x-px" aria-label="Pagination">
					{page !== 1 ? (
						<Fragment>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-200"
								onClick={(event) => _onChangePage(event, 1)}
							>
								<span className="sr-only">First</span>
								<AngleDoubleLeftIconComponent className="h-4 w-4" />
							</button>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-200"
								onClick={(event) => _onChangePage(event, page === 1 ? 1 : page - 1)}
							>
								<span className="sr-only">Previous</span>
								<AngleLeftIconComponent className="h-4 w-4" />
							</button>
						</Fragment>
					) : (
						<Fragment>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-base font-medium text-gray-400"
								disabled
							>
								<span className="sr-only">No first</span>
								<AngleDoubleLeftIconComponent className="h-4 w-4" />
							</button>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-base font-medium text-gray-400"
								disabled
							>
								<span className="sr-only">No previous</span>
								<AngleLeftIconComponent className="h-4 w-4" />
							</button>
						</Fragment>
					)}
					{pageNumbers.map((pageNumber, i) =>
						!pageNumber ? (
							<span
								className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-base font-medium text-gray-400"
								key={`${pageNumber}${i}`}
							>
								<EllipsisHorizontalIconComponent className="h-4 w-4" />
							</span>
						) : pageNumber === page ? (
							<button
								type="button"
								aria-current="page"
								className="bg-purple-600 text-white relative inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium"
								key={pageNumber}
							>
								{pageNumber}
							</button>
						) : (
							<button
								type="button"
								className="bg-white border-gray-300 text-gray-700 hover:bg-gray-200 relative inline-flex items-center px-4 py-2 border text-base font-medium"
								onClick={(event) => _onChangePage(event, Number(pageNumber))}
								key={pageNumber}
							>
								{pageNumber}
							</button>
						)
					)}
					{page !== totalPages ? (
						<Fragment>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-200"
								onClick={(event) => _onChangePage(event, page + 1)}
							>
								<span className="sr-only">Next</span>
								<AngleRightIconComponent className="h-4 w-4" />
							</button>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-200"
								onClick={(event) => _onChangePage(event, totalPages)}
							>
								<span className="sr-only">Last</span>
								<AngleDoubleRightIconComponent className="h-4 w-4" />
							</button>
						</Fragment>
					) : (
						<Fragment>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-base font-medium text-gray-400"
								disabled
							>
								<span className="sr-only">No next</span>
								<AngleRightIconComponent className="h-4 w-4" />
							</button>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-base font-medium text-gray-400"
								disabled
							>
								<span className="sr-only">No last</span>
								<AngleDoubleRightIconComponent className="h-4 w-4" />
							</button>
						</Fragment>
					)}
				</nav>
			</div>
		</div>
	);
};

export default PaginationComponent;
