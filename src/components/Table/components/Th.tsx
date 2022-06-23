import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'th'>;

const ThTableComponent = ({ className, children, ...props }: Props) => {
	return (
		<th {...props} className={classNames('p-3 text-left text-sm font-medium text-gray-500 tracking-wider whitespace-nowrap', className)}>
			{children}
		</th>
	);
};

export default ThTableComponent;
