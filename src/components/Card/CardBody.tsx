import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
	className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const CardBody = forwardRef(({ className, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
	<div {...props} className={classNames('card-body p-4 gap-4', className)} ref={ref} />
));

export default CardBody;
