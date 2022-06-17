import classNames from 'classnames';
import { forwardRef } from 'react';
import { Link, To } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type Props = {
	className?: string;
	href: To;
	children: React.ReactNode;
} & Omit<LinkProps, 'to'>;

const LinkComponent = forwardRef<HTMLAnchorElement, Props>(({ className, href, children, ...props }, ref) => (
	<Link {...props} ref={ref} className={classNames('', className)} to={href}>
		{children}
	</Link>
));

export default LinkComponent;
