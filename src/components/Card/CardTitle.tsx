import classNames from 'classnames';
import React, { forwardRef } from 'react';

export type CardTitleProps = {
	as?: React.ElementType;
} & React.ComponentPropsWithoutRef<'div'>;

const CardTitle = forwardRef(({ className, as: Component = 'h5', ...props }: CardTitleProps, ref: React.ForwardedRef<HTMLElement>) => {
	return <Component {...props} className={classNames('card-title', className)} ref={ref} />;
});

export default CardTitle;
