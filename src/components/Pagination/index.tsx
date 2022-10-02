import classNames from 'classnames';
import { Fragment } from 'react';

import Form from 'src/components/Form';
import { AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon, EllipsisHorizontalIcon } from 'src/components/Icon';
import { getPageNumbers, getTotalPages } from 'src/utils/pagination';

type Props = {
	className?: string;
	page: number;
	limit: number;
	total: number;
	limits?: number[];
	onChangePage: (page: number) => void;
	onChangeLimit: (limit: number) => void;
};

const Pagination = ({ className, page, limit, total, limits = [10, 20, 50, 100], onChangePage, onChangeLimit }: Props) => {
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
		<div className={classNames('overflow-x-auto mt-4 flex items-center justify-start md:justify-end', className)}>
			<div className="flex-none flex items-center mr-4 text-base text-gray-600">
				<p>
					<span className="font-medium">{limit * page - limit + 1}</span> &#8211; <span className="font-medium">{limit * page}</span> of{' '}
					<span className="font-medium">{total}</span>
				</p>
				<span className="mx-2"> | </span>
				<span className="text-gray-600">
					<Form.Select
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
			<div className="flex-none flex items-center">
				<nav className="relative inline-flex flex-wrap rounded-md -space-x-px" aria-label="Pagination">
					{page > 1 ? (
						<Fragment>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-200"
								onClick={(event) => _onChangePage(event, 1)}
							>
								<span className="sr-only">First</span>
								<AngleDoubleLeftIcon className="h-4 w-4" />
							</button>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-200"
								onClick={(event) => _onChangePage(event, page === 1 ? 1 : page - 1)}
							>
								<span className="sr-only">Previous</span>
								<AngleLeftIcon className="h-4 w-4" />
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
								<AngleDoubleLeftIcon className="h-4 w-4" />
							</button>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-base font-medium text-gray-400"
								disabled
							>
								<span className="sr-only">No previous</span>
								<AngleLeftIcon className="h-4 w-4" />
							</button>
						</Fragment>
					)}
					{/* {pageNumbers.map((pageNumber, i) =>
						!pageNumber ? (
							<span
								className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-base font-medium text-gray-400"
								key={`${pageNumber}${i}`}
							>
								<EllipsisHorizontalIcon className="h-4 w-4" />
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
					)} */}
					{page < totalPages ? (
						<Fragment>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-200"
								onClick={(event) => _onChangePage(event, page + 1)}
							>
								<span className="sr-only">Next</span>
								<AngleRightIcon className="h-4 w-4" />
							</button>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-200"
								onClick={(event) => _onChangePage(event, totalPages)}
							>
								<span className="sr-only">Last</span>
								<AngleDoubleRightIcon className="h-4 w-4" />
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
								<AngleRightIcon className="h-4 w-4" />
							</button>
							<button
								type="button"
								className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-base font-medium text-gray-400"
								disabled
							>
								<span className="sr-only">No last</span>
								<AngleDoubleRightIcon className="h-4 w-4" />
							</button>
						</Fragment>
					)}
				</nav>
			</div>
		</div>
	);
};

export default Pagination;
