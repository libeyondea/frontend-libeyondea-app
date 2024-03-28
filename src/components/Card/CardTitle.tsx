import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
	as?: React.ElementType;
} & React.ComponentPropsWithoutRef<'div'>;

const CardTitle = forwardRef(({ className, as: Component = 'h5', ...props }: Props, ref: React.ForwardedRef<HTMLElement>) => {
	return <Component {...props} className={classNames('card-title', className)} ref={ref} />;
});

export default CardTitle;
