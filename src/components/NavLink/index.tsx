import classNames from 'classnames';
import { forwardRef } from 'react';
import { NavLinkProps, NavLink as ReactNavLink, To } from 'react-router-dom';

type Props = {
	className?: string;
	classNameActive?: string;
	classNameDeactive?: string;
	to: To;
	children: React.ReactNode;
} & NavLinkProps;

const NavLink = forwardRef(({ className, classNameActive, classNameDeactive, to, children, ...props }: Props, ref: React.ForwardedRef<HTMLAnchorElement>) => (
	<ReactNavLink {...props} className={({ isActive }) => classNames(className, isActive ? classNameActive : classNameDeactive)} to={to} ref={ref} end>
		{children}
	</ReactNavLink>
));

export default NavLink;
