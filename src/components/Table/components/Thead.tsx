import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'thead'>;

const TheadTableComponent = ({ className, children, ...props }: Props) => {
	return (
		<thead {...props} className={classNames('bg-gray-50', className)}>
			{children}
		</thead>
	);
};

export default TheadTableComponent;
