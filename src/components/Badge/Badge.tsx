import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
	className?: string;
	color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	variant?: 'outline' | 'dash' | 'soft' | 'ghost';
	responsive?: boolean;
} & React.ComponentPropsWithRef<'div'>;

const Badge = forwardRef<HTMLDivElement, Props>(({ className, color = 'primary', size = 'md', variant, responsive = true, children, ...props }, ref) => {
	const classes = classNames(
		'badge',
		`badge-${color}`,
		`badge-${size}`,
		variant && `badge-${variant}`,
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
