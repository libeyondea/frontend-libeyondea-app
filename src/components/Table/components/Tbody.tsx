import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;

const TbodyTableComponent: React.FC<Props> = ({ className, children, ...props }) => {
	return (
		<tbody {...props} className={classNames('bg-white divide-y divide-gray-200', className)}>
			{children}
		</tbody>
	);
};

export default TbodyTableComponent;
