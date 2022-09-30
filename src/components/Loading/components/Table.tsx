import classNames from 'classnames';

import Table from 'src/components/Table/components';

type Props = {
	className?: string;
};

const TableLoading = ({ className }: Props) => {
	return (
		<Table className={classNames('animate-pulse', className)}>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>
						<div className="h-6 bg-slate-200 rounded-md" />
					</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				<Table.Tr>
					<Table.Td>
						<div className="h-6 bg-slate-200 rounded-md" />
					</Table.Td>
				</Table.Tr>
				<Table.Tr>
					<Table.Td>
						<div className="h-6 bg-slate-200 rounded-md" />
					</Table.Td>
				</Table.Tr>
				<Table.Tr>
					<Table.Td>
						<div className="h-6 bg-slate-200 rounded-md" />
					</Table.Td>
				</Table.Tr>
				<Table.Tr>
					<Table.Td>
						<div className="h-6 bg-slate-200 rounded-md" />
					</Table.Td>
				</Table.Tr>
				<Table.Tr>
					<Table.Td>
						<div className="h-6 bg-slate-200 rounded-md" />
					</Table.Td>
				</Table.Tr>
			</Table.Tbody>
		</Table>
	);
};

export default TableLoading;
