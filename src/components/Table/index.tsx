import classNames from 'classnames';

import TbodyTable from './Tbody';
import TdTable from './Td';
import ThTable from './Th';
import TheadTable from './Thead';
import TrTable from './Tr';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'table'>;

const Table = ({ className, children, ...props }: Props) => {
	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto">
				<div className="align-middle inline-block min-w-full relative">
					<div className="overflow-hidden border-2 border-gray-200 rounded-md">
						<table {...props} className={classNames('min-w-full divide-y divide-gray-200', className)}>
							{children}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Object.assign(Table, {
	Thead: TheadTable,
	Tr: TrTable,
	Th: ThTable,
	Tbody: TbodyTable,
	Td: TdTable
});
