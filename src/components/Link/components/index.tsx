import { Link, To } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { forwardRef } from 'react';
import classNames from 'classnames';

type Props = {
	className?: string;
	to: To;
	children: React.ReactNode;
} & LinkProps;

const LinkComponent = forwardRef<HTMLAnchorElement, Props>(({ className, to, children, ...props }, ref) => (
	<Link {...props} ref={ref} className={classNames('', className)} to={to}>
		{children}
	</Link>
));

export default LinkComponent;
