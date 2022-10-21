import classNames from 'classnames';
import _ from 'lodash';

import { EditIcon, TrashIcon } from '../Icon';

type Props<T> = {
	className?: string;
	columns: string[];
	data: T[];
	loading?: boolean;
	action?: {
		onClickEdit?: (id: number) => void;
		onClickDelete?: (id: number) => void;
	};
	columnCell?: (key: keyof T, value: any, row: T) => any;
} & React.ComponentPropsWithoutRef<'table'>;

const Table = <T extends Record<string, any> = Record<string, any>>({ className, columns, data, loading = false, action, columnCell, ...props }: Props<T>) => {
	return (
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
							{columns.map((column, index) =>
								column === 'action' ? (
									<th key={index}>
										<span className="sr-only">Action</span>
									</th>
								) : (
									<th key={index}>{_.startCase(_.camelCase(_.toString(column)))}</th>
								)
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
									{columns.map((column, index) =>
										column === 'action' ? (
											<td key={index}>
												<div className="flex items-center">
													<button
														type="button"
														className="text-info hover:text-info-content mr-2"
														onClick={() => action && action.onClickEdit && action.onClickEdit(data.id)}
													>
														<EditIcon className="h-5 w-5" />
													</button>
													<button
														type="button"
														className="text-error hover:text-error-content"
														onClick={() => action && action.onClickDelete && action.onClickDelete(data.id)}
													>
														<TrashIcon className="h-5 w-5" />
													</button>
												</div>
											</td>
										) : (
											<td key={index}>{columnCell ? columnCell(column, data[column], data) : _.toString(data[column])}</td>
										)
									)}
								</tr>
							))
						)}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Table;
