import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'tr'>;

const TrTableComponent = ({ className, children, ...props }: Props) => {
	return (
		<tr {...props} className={classNames('', className)}>
			{children}
		</tr>
	);
};

export default TrTableComponent;
