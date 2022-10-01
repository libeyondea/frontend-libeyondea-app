import { forwardRef } from 'react';
import { Link as ReactLink, To } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type Props = {
	className?: string;
	to: To;
	children: React.ReactNode;
} & LinkProps;

const Link = ({ className, to, children, ...props }: Props, ref: React.ForwardedRef<HTMLAnchorElement>) => (
	<ReactLink {...props} className={className} to={to} ref={ref}>
		{children}
	</ReactLink>
);

export default forwardRef(Link);
