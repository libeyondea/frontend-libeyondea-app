import { forwardRef } from 'react';
import { Link, To } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type Props = {
	className?: string;
	to: To;
	children: React.ReactNode;
} & LinkProps;

const LinkComponent = ({ className, to, children, ...props }: Props, ref: React.ForwardedRef<HTMLAnchorElement>) => (
	<Link {...props} className={className} to={to} ref={ref}>
		{children}
	</Link>
);

export default forwardRef(LinkComponent);
