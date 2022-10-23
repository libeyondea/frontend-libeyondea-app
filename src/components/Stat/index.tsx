import classNames from 'classnames';
import { Fragment, forwardRef } from 'react';

import { SpinLoading } from '../Loading';

type Props = {
	className?: string;
	title: string;
	value: string | number;
	description?: string;
	figure?: string | number | JSX.Element;
	loading?: boolean;
};

const Stat = ({ className, title, value, description, figure, loading }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div className={classNames('stats bg-base-100 w-full shadow-md', className)} ref={ref}>
			<div className="stat p-4">
				{loading ? (
					<SpinLoading />
				) : (
					<Fragment>
						<div className="stat-figure text-primary">{figure}</div>
						<div className="stat-title">{title}</div>
						<div className="stat-value text-primary">{value}</div>
						{description && <div className="stat-desc">{description}</div>}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default forwardRef(Stat);
