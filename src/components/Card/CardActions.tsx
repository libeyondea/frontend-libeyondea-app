import classNames from 'classnames';
import React, { forwardRef } from 'react';

export type CardActionsProps = {
	className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const CardActions = forwardRef(({ className, ...props }: CardActionsProps, ref: React.ForwardedRef<HTMLDivElement>) => (
	<div {...props} className={classNames('card-actions', className)} ref={ref} />
));

export default CardActions;
