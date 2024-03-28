import classNames from 'classnames';
import _ from 'lodash';
import React, { forwardRef } from 'react';

import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from './DropdownToggle';

type Props = {
	className?: string;
	drop?: 'top' | 'bottom' | 'left' | 'right';
	align?: 'start' | 'end';
	open?: boolean;
	hover?: boolean;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const Dropdown = _.assign(
	forwardRef(
		({ className, drop = 'bottom', align = 'start', open = false, hover = false, children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
			const classes = classNames(
				'dropdown',
				{
					'dropdown-top': drop === 'top',
					'dropdown-bottom': drop === 'bottom',
					'dropdown-left': drop === 'left',
					'dropdown-right': drop === 'right'
				},
				{
					'dropdown-start': align === 'start',
					'dropdown-end': align === 'end'
				},
				{
					'dropdown-hover': hover,
					'dropdown-open': open
				},
				className
			);

			return (
				<div {...props} className={classes} ref={ref}>
					{children}
				</div>
			);
		}
	),
	{
		Toggle: DropdownToggle,
		Menu: DropdownMenu,
		Item: DropdownItem
	}
);

export default Dropdown;
