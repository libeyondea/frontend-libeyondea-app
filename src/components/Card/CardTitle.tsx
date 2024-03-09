import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
	as?: React.ElementType;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const CardTitle = forwardRef(({ className, as: Component = 'h5', children, ...props }: Props, ref: React.ForwardedRef<HTMLElement>) => {
	return (
		<Component {...props} className={classNames('flex items-center text-xl font-semibold', className)} ref={ref}>
			{children}
		</Component>
	);
});

export default CardTitle;
