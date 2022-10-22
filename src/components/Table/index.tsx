import classNames from 'classnames';
import _ from 'lodash';

import { EditIcon, TrashIcon } from '../Icon';
import Pagination from './Pagination';
import SortSearch from './SortSearch';
import time from 'src/utils/time';

type Props<T> = {
	className?: string;
	columns: string[];
	data: T[];
	loading?: boolean;
	disabled?: boolean;
	action?: {
		onClickEdit: (id: number) => void;
		onClickDelete: (id: number) => void;
	};
	sortSearch?: {
		sortBy: string;
		sortByOptions: string[];
		sortDirection: string;
		searchTemp: string;
		onChangeSortBy: (sortBy: string) => void;
		onChangeSortDirection: (sortDirection: string) => void;
		onChangeSearch: (search: string) => void;
		onChangeSearchTemp: (searchTemp: string) => void;
	};
	pagination?: {
		page: number;
		pageSize: number;
		total: number;
		onChangePage: (page: number) => void;
		onChangePageSize: (pageSize: number) => void;
	};
	columnCell?: (key: keyof T, value: any, row: T) => any;
} & React.ComponentPropsWithoutRef<'table'>;

const Table = <T extends Record<string, any> = Record<string, any>>({
	className,
	columns,
	data,
	loading = false,
	disabled = false,
	action,
	sortSearch,
	pagination,
	columnCell,
	...props
}: Props<T>) => {
	return (
		<>
			{sortSearch && (
				<SortSearch
					sortBy={sortSearch.sortBy}
					sortByOptions={sortSearch.sortByOptions}
					sortDirection={sortSearch.sortDirection}
					searchTemp={sortSearch.searchTemp}
					onChangeSortBy={sortSearch.onChangeSortBy}
					onChangeSortDirection={sortSearch.onChangeSortDirection}
					onChangeSearch={sortSearch.onChangeSearch}
					onChangeSearchTemp={sortSearch.onChangeSearchTemp}
					disabled={disabled || loading}
				/>
			)}
			<div className="overflow-x-auto w-full">
				{loading ? (
					<table className={classNames('table table-compact w-full animate-pulse', className)}>
						<thead>
							<tr>
								<th>
									<div className="h-6 bg-base-300 rounded-md" />
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div className="h-6 bg-base-300 rounded-md" />
								</td>
							</tr>
						</tbody>
					</table>
				) : (
					<table {...props} className={classNames('table table-compact w-full', className)}>
						<thead>
							<tr>
								{columns.map((column, index) => (
									<th key={index}>{_.startCase(_.camelCase(_.toString(column)))}</th>
								))}
								{action && (
									<th>
										<span className="sr-only">Action</span>
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{_.isEmpty(data) ? (
								<tr>
									<td className="text-center" colSpan={_.size(columns)}>
										No data.
									</td>
								</tr>
							) : (
								data.map((data, index) => (
									<tr key={index}>
										{columns.map((column, index) => (
											<td key={index}>
												{column === 'updated_at'
													? time.ago(data[column])
													: column === 'created_at'
													? time.format(data[column])
													: columnCell
													? columnCell(column, data[column], data)
													: _.toString(data[column])}
											</td>
										))}
										{action && (
											<td key={index}>
												<div className="flex items-center">
													<button
														type="button"
														className="text-info hover:text-info-content mr-2"
														onClick={() => action.onClickEdit(data.id)}
														disabled={disabled}
													>
														<EditIcon className="h-5 w-5" />
													</button>
													<button
														type="button"
														className="text-error hover:text-error-content"
														onClick={() => action.onClickDelete(data.id)}
														disabled={disabled}
													>
														<TrashIcon className="h-5 w-5" />
													</button>
												</div>
											</td>
										)}
									</tr>
								))
							)}
						</tbody>
					</table>
				)}
			</div>
			{pagination && (
				<Pagination
					page={pagination.page}
					pageSize={pagination.pageSize}
					total={pagination.total}
					onChangePage={pagination.onChangePage}
					onChangePageSize={pagination.onChangePageSize}
					disabled={disabled || loading}
				/>
			)}
		</>
	);
};

export default Table;
