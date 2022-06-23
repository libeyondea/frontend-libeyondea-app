import classNames from 'classnames';
import { forwardRef } from 'react';
import { NavLink, NavLinkProps, To } from 'react-router-dom';

type Props = {
	className?: string;
	classNameActive?: string;
	classNameNotActive?: string;
	to: To;
	children: React.ReactNode;
} & NavLinkProps;

const NavLinkComponent = ({ className, classNameActive, classNameNotActive, to, children, ...props }: Props, ref: React.ForwardedRef<HTMLAnchorElement>) => (
	<NavLink {...props} className={({ isActive }) => classNames(className, isActive ? classNameActive : classNameNotActive)} to={to} ref={ref} end>
		{children}
	</NavLink>
);

export default forwardRef(NavLinkComponent);
