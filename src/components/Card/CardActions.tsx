import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
	className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const CardActions = forwardRef(({ className, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
	<div {...props} className={classNames('card-actions', className)} ref={ref} />
));

export default CardActions;
