import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'th'>;

const ThTable = ({ className, children, ...props }: Props) => {
	return (
		<th {...props} className={classNames('', className)}>
			{children}
		</th>
	);
};

export default ThTable;
