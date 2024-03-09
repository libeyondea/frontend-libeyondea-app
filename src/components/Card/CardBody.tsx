import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
	className?: string;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const CardBody = forwardRef(({ className, children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div {...props} className={classNames('flex flex-auto flex-col gap-4 p-4', className)} ref={ref}>
			{children}
		</div>
	);
});

export default CardBody;
