import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>;

const TdTableComponent: React.FC<Props> = ({ className, children, ...props }) => {
	return (
		<td {...props} className={classNames('p-3 text-sm text-gray-500', className)}>
			{children}
		</td>
	);
};

export default TdTableComponent;
