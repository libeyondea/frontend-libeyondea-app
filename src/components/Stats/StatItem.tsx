import classNames from 'classnames';
import React, { forwardRef } from 'react';

export type StatItemProps = {
	variant: 'title' | 'value' | 'desc' | 'figure' | 'actions';
} & React.ComponentPropsWithoutRef<'div'>;

const StatItem = forwardRef(({ className, variant, ...props }: StatItemProps, ref: React.ForwardedRef<HTMLDivElement>) => {
	const classes = classNames(
		{
			'stat-title': variant === 'title',
			'stat-value': variant === 'value',
			'stat-desc': variant === 'desc',
			'stat-figure': variant === 'figure',
			'stat-actions': variant === 'actions'
		},
		className
	);

	return <div {...props} className={classes} ref={ref} />;
});

export default StatItem;
