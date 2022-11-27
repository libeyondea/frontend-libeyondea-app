import classNames from 'classnames';
import React, { forwardRef } from 'react';

export type BadgeProps = {
	color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	variant?: 'contain' | 'outline';
	responsive?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'color'>;

const Badge = forwardRef(
	(
		{ className, color = 'primary', size = 'md', variant = 'contain', responsive, children, ...props }: BadgeProps,
		ref: React.ForwardedRef<HTMLDivElement>
	) => {
		const classes = classNames(
			'badge',
			{
				'badge-primary': color === 'primary',
				'badge-secondary': color === 'secondary',
				'badge-accent': color === 'accent',
				'badge-info': color === 'info',
				'badge-success': color === 'success',
				'badge-warning': color === 'warning',
				'badge-error': color === 'error',
				'badge-ghost': color === 'ghost'
			},
			{
				'badge-lg': size === 'lg',
				'badge-md': size === 'md',
				'badge-sm': size === 'sm',
				'badge-xs': size === 'xs'
			},
			{
				'btn-contain': variant === 'contain',
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
	}
);

export default Badge;
