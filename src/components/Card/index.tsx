import classNames from 'classnames';
import { forwardRef } from 'react';

type Props = {
	className?: string;
	title?: string;
	subTitle?: string;
	children: React.ReactNode;
};

const Card = ({ className, title, subTitle, children }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div className={classNames('card bg-base-100 w-full shadow-md', className)} ref={ref}>
			<div className="card-body p-4 gap-4">
				{title && <h2 className="card-title">{title}</h2>}
				{subTitle && <h3 className="card-title justify-center">{subTitle}</h3>}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default forwardRef(Card);
