import classNames from 'classnames';

import TbodyTableComponent from './Tbody';
import TdTableComponent from './Td';
import ThTableComponent from './Th';
import TheadTableComponent from './Thead';
import TrTableComponent from './Tr';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'table'>;

const TableComponent = ({ className, children, ...props }: Props) => {
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

export default Object.assign(TableComponent, {
	Thead: TheadTableComponent,
	Tr: TrTableComponent,
	Th: ThTableComponent,
	Tbody: TbodyTableComponent,
	Td: TdTableComponent
});
