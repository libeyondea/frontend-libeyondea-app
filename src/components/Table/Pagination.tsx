import classNames from 'classnames';
import _ from 'lodash';

import Form from 'src/components/Form';
import { AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon } from 'src/components/Icon';

type Props = {
	className?: string;
	page: number;
	pageSize: number;
	total: number;
	disabled?: boolean;
	onChangePage: (page: number) => void;
	onChangePageSize: (pageSize: number) => void;
};

const Pagination = ({ className, page, pageSize, total, disabled = false, onChangePage, onChangePageSize }: Props) => {
	const totalPages = _.ceil(total / pageSize);

	const _onChangePage = (page: number) => {
		onChangePage(page);
	};

	const _onChangePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChangePageSize(Number(event.target.value));
	};

	return (
		<div className={classNames('overflow-x-auto mt-4 flex items-center justify-start md:justify-end', className)}>
			<div className="flex-none flex items-center mr-4">
				<span>
					<Form.Select
						name="page_size"
						value={pageSize}
						onChange={(event) => _onChangePageSize(event)}
						options={[10, 20, 50, 100]}
						sizeType="sm"
						disabled={disabled}
					/>
				</span>
				<span className="mx-2"> | </span>
				<span>
					<span className="font-semibold">{pageSize * page - pageSize + 1}</span> &#8211; <span className="font-semibold">{pageSize * page}</span> of{' '}
					<span className="font-semibold">{total}</span>
				</span>
			</div>
			<div className="flex-none flex items-center">
				<nav className="btn-group">
					<button type="button" className="btn btn-sm btn-primary btn-outline" onClick={() => _onChangePage(1)} disabled={page <= 1 || disabled}>
						<AngleDoubleLeftIcon className="h-4 w-4" />
					</button>
					<button
						type="button"
						className="btn btn-sm btn-primary btn-outline"
						onClick={() => _onChangePage(page - 1)}
						disabled={page <= 1 || disabled}
					>
						<AngleLeftIcon className="h-4 w-4" />
					</button>
					<button
						type="button"
						className="btn btn-sm btn-primary btn-outline"
						onClick={() => _onChangePage(page + 1)}
						disabled={page >= totalPages || disabled}
					>
						<AngleRightIcon className="h-4 w-4" />
					</button>
					<button
						type="button"
						className="btn btn-sm btn-primary btn-outline"
						onClick={() => _onChangePage(totalPages)}
						disabled={page >= totalPages || disabled}
					>
						<AngleDoubleRightIcon className="h-4 w-4" />
					</button>
				</nav>
			</div>
		</div>
	);
};

export default Pagination;
