import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>;

const Th: React.FC<Props> = ({ className, children, ...props }) => {
	return (
		<th
			{...props}
			className={classNames('p-3 text-left text-sm font-medium text-gray-500 tracking-wider whitespace-nowrap', className)}
		>
			{children}
		</th>
	);
};

export default Th;
