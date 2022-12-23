import React, { forwardRef } from 'react';

type Props = {
	className?: string;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const CardContent = forwardRef(({ className, children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div {...props} className={className} ref={ref}>
			{children}
		</div>
	);
});

export default CardContent;
