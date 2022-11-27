import React, { forwardRef } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';

type Props = {
	className?: string;
	to?: To;
	children: React.ReactNode;
} & Omit<LinkProps, 'to'>;

const DropdownItem = forwardRef(({ className, to, children, ...props }: Props, ref: React.ForwardedRef<HTMLAnchorElement>) => {
	return (
		<li className={className}>
			{to ? (
				<Link {...props} to={to} ref={ref}>
					{children}
				</Link>
			) : (
				children
			)}
		</li>
	);
});

export default DropdownItem;
