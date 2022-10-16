import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'td'>;

const TdTable = ({ className, children, ...props }: Props) => {
	return (
		<td {...props} className={classNames('', className)}>
			{children}
		</td>
	);
};

export default TdTable;
