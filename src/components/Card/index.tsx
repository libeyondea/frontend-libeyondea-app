import classNames from 'classnames';
import { forwardRef } from 'react';

type Props = {
	className?: string;
	title?: string;
	children: React.ReactNode;
};

const Card = ({ className, title, children }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div className={classNames('card bg-base-100 w-full shadow-lg rounded-md', className)} ref={ref}>
			<div className="card-body p-4">
				{title && <h2 className="card-title">{title}</h2>}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default forwardRef(Card);
