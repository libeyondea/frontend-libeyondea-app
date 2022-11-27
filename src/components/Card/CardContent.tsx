import React, { forwardRef } from 'react';

export type CardContentProps = {
	className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const CardContent = forwardRef(({ className, ...props }: CardContentProps, ref: React.ForwardedRef<HTMLDivElement>) => (
	<div {...props} className={className} ref={ref} />
));

export default CardContent;
