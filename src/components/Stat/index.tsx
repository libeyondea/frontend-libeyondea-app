import classNames from 'classnames';
import { forwardRef } from 'react';

type Props = {
	className?: string;
	title: string;
	value: string | number;
	description?: string;
	figure?: string | number | JSX.Element;
};

const Stat = ({ className, title, value, description, figure }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div className={classNames('stats bg-base-100 w-full shadow-md', className)} ref={ref}>
			<div className="stat p-4">
				<div className="stat-figure text-primary">{figure}</div>
				<div className="stat-title">{title}</div>
				<div className="stat-value text-primary">{value}</div>
				{description && <div className="stat-desc">{description}</div>}
			</div>
		</div>
	);
};

export default forwardRef(Stat);
