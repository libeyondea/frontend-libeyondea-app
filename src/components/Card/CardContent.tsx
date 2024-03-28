import React, { forwardRef } from 'react';

type Props = {
	className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const CardContent = forwardRef(({ className, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => <div {...props} className={className} ref={ref} />);

export default CardContent;
