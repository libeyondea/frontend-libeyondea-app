import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;

const TrTableComponent: React.FC<Props> = ({ className, children, ...props }) => {
	return (
		<tr {...props} className={classNames('', className)}>
			{children}
		</tr>
	);
};

export default TrTableComponent;
