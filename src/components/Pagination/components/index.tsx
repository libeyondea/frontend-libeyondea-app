import classNames from 'classnames';
import { Fragment } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';

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

const PaginationComponent: React.FC<Props> = ({ className, page, limit, total, limits = [10, 20, 50, 100], onChangePage, onChangeLimit }) => {
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
		<div className={classNames('mt-4 flex items-center justify-between', className)}>
			<div className="sm:flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
				<div className="flex items-center mb-4 md:mb-0 mr-0 md:mr-4">
					<p className="text-sm text-gray-700">
						Showing <span className="font-medium">{limit * page - limit + 1}</span> to <span className="font-medium">{limit * page}</span> of{' '}
						<span className="font-medium">{total}</span> results
					</p>
					<span className="mx-2 text-sm text-gray-700">|</span>
					<span className="flex items-center text-sm text-gray-700">
						Limit
						<select
							className="ml-2 rounded-md appearance-none border border-gray-300 py-2 pl-4 pr-8 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							value={limit}
							onChange={(event) => _onChangeLimit(event)}
						>
							{limits.map((limit, index) => (
								<option key={index} value={limit}>
									{limit}
								</option>
							))}
						</select>
					</span>
				</div>
				<div className="flex items-center">
					<nav className="relative inline-flex flex-wrap rounded-md -space-x-px" aria-label="Pagination">
						{page !== 1 ? (
							<Fragment>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200"
									onClick={(event) => _onChangePage(event, 1)}
								>
									<span className="sr-only">First</span>
									<FaAngleDoubleLeft className="h-4 w-4" />
								</button>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200"
									onClick={(event) => _onChangePage(event, page === 1 ? 1 : page - 1)}
								>
									<span className="sr-only">Previous</span>
									<FaAngleLeft className="h-4 w-4" />
								</button>
							</Fragment>
						) : (
							<Fragment>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-400"
									disabled
								>
									<span className="sr-only">No first</span>
									<FaAngleDoubleLeft className="h-4 w-4" />
								</button>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-400"
									disabled
								>
									<span className="sr-only">No previous</span>
									<FaAngleLeft className="h-4 w-4" />
								</button>
							</Fragment>
						)}
						{pageNumbers.map((pageNumber, i) =>
							!pageNumber ? (
								<span
									className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-400"
									key={`${pageNumber}${i}`}
								>
									<MdMoreHoriz />
								</span>
							) : pageNumber === page ? (
								<button
									type="button"
									aria-current="page"
									className="bg-purple-600 text-white relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium"
									key={pageNumber}
								>
									{pageNumber}
								</button>
							) : (
								<button
									type="button"
									className="bg-white border-gray-300 text-gray-700 hover:bg-gray-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
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
									className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200"
									onClick={(event) => _onChangePage(event, page + 1)}
								>
									<span className="sr-only">Next</span>
									<FaAngleRight className="h-4 w-4" />
								</button>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200"
									onClick={(event) => _onChangePage(event, totalPages)}
								>
									<span className="sr-only">Last</span>
									<FaAngleDoubleRight className="h-4 w-4" />
								</button>
							</Fragment>
						) : (
							<Fragment>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-400"
									disabled
								>
									<span className="sr-only">No next</span>
									<FaAngleRight className="h-4 w-4" />
								</button>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-400"
									disabled
								>
									<span className="sr-only">No last</span>
									<FaAngleDoubleRight className="h-4 w-4" />
								</button>
							</Fragment>
						)}
					</nav>
				</div>
			</div>
		</div>
	);
};

export default PaginationComponent;
