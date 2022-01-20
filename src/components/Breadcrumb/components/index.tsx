import classNames from 'classnames';

type Props = {
	children: React.ReactNode;
	className?: string;
};

const BreadcrumbComponent: React.FC<Props> = ({ children, className }) => {
	return (
		<div className={classNames('flex', className)}>
			<h3 className="text-2xl font-bold">{children}</h3>
		</div>
	);
};

export default BreadcrumbComponent;
