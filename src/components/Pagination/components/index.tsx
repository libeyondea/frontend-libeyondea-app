import getPageNumbers from 'helpers/getPageNumbers';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';

type Props = {
	limits?: Array<number>;
	total: number;
	limit: number;
	currentPage: number;
	onChangePage: (page: number) => void;
	onChangeLimit: (limit: number) => void;
};

const Paginationomponent: React.FC<Props> = ({
	limits = [10, 20, 50, 100],
	total,
	limit,
	currentPage,
	onChangePage,
	onChangeLimit
}) => {
	const totalPage = Math.ceil(total / limit);
	const pageNumbers = getPageNumbers({ currentPage, limit, total });

	const onChangePageHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => {
		e.preventDefault();
		onChangePage(page);
	};

	const onChangeLimitHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		onChangeLimit(parseInt(e.target.value));
	};

	return (
		<div className="mt-4 flex items-center justify-between">
			<div className="sm:flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
				<div className="flex items-center mb-4 md:mb-0 mr-0 md:mr-4">
					<p className="text-sm text-gray-700">
						Showing <span className="font-medium">{limit * currentPage - limit + 1}</span> to{' '}
						<span className="font-medium">{limit * currentPage}</span> of <span className="font-medium">{total}</span>{' '}
						results
					</p>
					<span className="mx-2 text-sm text-gray-700">|</span>
					<span className="flex items-center text-sm text-gray-700">
						Limit
						<select
							className="ml-2 rounded-md appearance-none border border-gray-300 py-2 pl-4 pr-8 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							value={limit}
							onChange={(e) => onChangeLimitHandle(e)}
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
						{currentPage !== 1 ? (
							<>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									onClick={(event) => onChangePageHandle(event, 1)}
								>
									<span className="sr-only">First</span>
									<FaAngleDoubleLeft className="h-4 w-4" aria-hidden="true" />
								</button>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									onClick={(event) => onChangePageHandle(event, currentPage === 1 ? 1 : currentPage - 1)}
								>
									<span className="sr-only">Previous</span>
									<FaAngleLeft className="h-4 w-4" aria-hidden="true" />
								</button>
							</>
						) : (
							<>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									disabled
								>
									<span className="sr-only">No first</span>
									<FaAngleDoubleLeft className="h-4 w-4" aria-hidden="true" />
								</button>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									disabled
								>
									<span className="sr-only">No previous</span>
									<FaAngleLeft className="h-4 w-4" aria-hidden="true" />
								</button>
							</>
						)}
						{pageNumbers.map((pageNumber, i) =>
							pageNumber === '...' ? (
								<span
									className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
									key={`${pageNumber}${i}`}
								>
									<MdMoreHoriz />
								</span>
							) : pageNumber === currentPage ? (
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
									className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
									onClick={(e) => onChangePageHandle(e, Number(pageNumber))}
									key={pageNumber}
								>
									{pageNumber}
								</button>
							)
						)}
						{currentPage !== totalPage ? (
							<>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									onClick={(e) => onChangePageHandle(e, currentPage + 1)}
								>
									<span className="sr-only">Next</span>
									<FaAngleRight className="h-4 w-4" aria-hidden="true" />
								</button>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									onClick={(e) => onChangePageHandle(e, totalPage)}
								>
									<span className="sr-only">Last</span>
									<FaAngleDoubleRight className="h-4 w-4" aria-hidden="true" />
								</button>
							</>
						) : (
							<>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									disabled
								>
									<span className="sr-only">No next</span>
									<FaAngleRight className="h-4 w-4" aria-hidden="true" />
								</button>
								<button
									type="button"
									className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									disabled
								>
									<span className="sr-only">No last</span>
									<FaAngleDoubleRight className="h-4 w-4" aria-hidden="true" />
								</button>
							</>
						)}
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Paginationomponent;
