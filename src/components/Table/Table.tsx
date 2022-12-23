import classNames from 'classnames';
import _ from 'lodash';
import { Fragment } from 'react';

import Button from '../Button';
import { EditIcon, TrashIcon } from '../Icon';
import Pagination from './Pagination';
import ToolBar from './ToolBar';
import time from 'src/utils/time';

type Props<T> = {
	className?: string;
	hiddenColumns?: string[];
	columns: string[];
	data: T[];
	loading?: boolean;
	disabled?: boolean;
	action?: {
		onClickEdit: (id: number) => void;
		onClickDelete: (id: number) => void;
	};
	toolBar?: {
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
	hiddenColumns,
	columns,
	data,
	loading = false,
	disabled = false,
	action,
	toolBar,
	pagination,
	columnCell,
	...props
}: Props<T>) => {
	return (
		<Fragment>
			{toolBar && (
				<ToolBar
					hiddenColumns={hiddenColumns}
					sortBy={toolBar.sortBy}
					sortByOptions={toolBar.sortByOptions}
					sortDirection={toolBar.sortDirection}
					searchTemp={toolBar.searchTemp}
					onChangeSortBy={toolBar.onChangeSortBy}
					onChangeSortDirection={toolBar.onChangeSortDirection}
					onChangeSearch={toolBar.onChangeSearch}
					onChangeSearchTemp={toolBar.onChangeSearchTemp}
					disabled={disabled || loading}
				/>
			)}
			<div className="overflow-x-auto">
				{loading ? (
					<table className={classNames('table-compact table w-full animate-pulse', className)}>
						<thead>
							<tr>
								<th>
									<div className="bg-base-300 h-6 rounded-md" />
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div className="bg-base-300 h-6 rounded-md" />
								</td>
							</tr>
						</tbody>
					</table>
				) : (
					<table {...props} className={classNames('table-compact table w-full', className)}>
						<thead>
							<tr>
								{_.map(
									_.filter(columns, (column) => !_.includes(hiddenColumns, column)),
									(column, index) => (
										<th key={index}>{_.startCase(_.camelCase(_.toString(column)))}</th>
									)
								)}
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
								_.map(data, (data, index) => (
									<tr key={index}>
										{_.map(
											_.filter(columns, (column) => !_.includes(hiddenColumns, column)),
											(column, index) => (
												<td key={index}>
													{column === 'updated_at'
														? time.ago(data[column])
														: column === 'created_at'
														? time.format(data[column])
														: columnCell
														? columnCell(column, data[column], data)
														: _.toString(data[column])}
												</td>
											)
										)}
										{action && (
											<td key={index}>
												<div className="flex items-center">
													<Button
														className="mr-2"
														color="info"
														variant="outlined"
														onClick={() => action.onClickEdit(data.id)}
														disabled={disabled}
													>
														<EditIcon className="h-5 w-5" />
													</Button>
													<Button color="danger" variant="outlined" onClick={() => action.onClickDelete(data.id)} disabled={disabled}>
														<TrashIcon className="h-5 w-5" />
													</Button>
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
		</Fragment>
	);
};

export default Table;
