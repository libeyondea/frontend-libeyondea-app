import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
	className?: string;
	color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	variant?: 'soft' | 'outline';
	responsive?: boolean;
	children?: React.ReactNode;
};

const Badge = forwardRef<HTMLDivElement, Props>(({ className, color = 'primary', size = 'md', variant, responsive, children, ...props }, ref) => {
	const classes = classNames(
		'badge',
		{
			'badge-primary': color === 'primary',
			'badge-secondary': color === 'secondary',
			'badge-accent': color === 'accent',
			'badge-neutral': color === 'neutral',
			'badge-info': color === 'info',
			'badge-success': color === 'success',
			'badge-warning': color === 'warning',
			'badge-error': color === 'error'
		},
		{
			'badge-lg': size === 'lg',
			'badge-md': size === 'md',
			'badge-sm': size === 'sm',
			'badge-xs': size === 'xs'
		},
		{
			'btn-soft': variant === 'soft',
			'btn-outline': variant === 'outline'
		},
		{
			'badge-xs md:badge-sm lg:badge-md xl:badge-lg': responsive
		},
		className
	);

	return (
		<div {...props} className={classes} ref={ref}>
			{children}
		</div>
	);
});

export default Badge;
