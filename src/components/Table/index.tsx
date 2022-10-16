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
		<div className="overflow-x-auto w-full">
			<table {...props} className={classNames('table table-compact w-full', className)}>
				{children}
			</table>
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
