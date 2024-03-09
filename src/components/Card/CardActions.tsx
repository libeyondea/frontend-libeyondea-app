import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
	className?: string;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const CardActions = forwardRef(({ className, children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
	<div {...props} className={classNames('flex items-start gap-4', className)} ref={ref}>
		{children}
	</div>
));

export default CardActions;
