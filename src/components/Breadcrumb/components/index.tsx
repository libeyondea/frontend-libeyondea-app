import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
};

const BreadcrumbComponent = ({ className, children }: Props) => {
	return (
		<div className={classNames('flex', className)}>
			<h1 className="text-2xl font-bold">{children}</h1>
		</div>
	);
};

export default BreadcrumbComponent;
