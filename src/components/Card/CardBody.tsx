import classNames from 'classnames';
import React, { forwardRef } from 'react';

export type CardBodyProps = {
	className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const CardBody = forwardRef(({ className, ...props }: CardBodyProps, ref: React.ForwardedRef<HTMLDivElement>) => (
	<div {...props} className={classNames('card-body p-4 gap-4', className)} ref={ref} />
));

export default CardBody;
