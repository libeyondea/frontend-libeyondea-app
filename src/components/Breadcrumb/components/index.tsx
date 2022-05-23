import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
};

const BreadcrumbComponent: React.FC<Props> = ({ className, children }) => {
	return (
		<div className={classNames('flex', className)}>
			<h3 className="text-2xl font-bold">{children}</h3>
		</div>
	);
};

export default BreadcrumbComponent;
