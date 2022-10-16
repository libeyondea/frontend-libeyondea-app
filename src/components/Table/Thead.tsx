import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'thead'>;

const TheadTable = ({ className, children, ...props }: Props) => {
	return (
		<thead {...props} className={classNames('', className)}>
			{children}
		</thead>
	);
};

export default TheadTable;
