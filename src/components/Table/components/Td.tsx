import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'td'>;

const TdTableComponent = ({ className, children, ...props }: Props) => {
	return (
		<td {...props} className={classNames('p-3 text-sm text-gray-500', className)}>
			{children}
		</td>
	);
};

export default TdTableComponent;
