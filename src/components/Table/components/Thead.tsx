import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;

const Thead: React.FC<Props> = ({ className, children, ...props }) => {
	return (
		<thead {...props} className={classNames('bg-gray-50', className)}>
			{children}
		</thead>
	);
};

export default Thead;
