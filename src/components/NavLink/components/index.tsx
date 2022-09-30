import classNames from 'classnames';
import { forwardRef } from 'react';
import { NavLinkProps, NavLink as ReactNavLink, To } from 'react-router-dom';

type Props = {
	className?: string;
	classNameActive?: string;
	classNameNotActive?: string;
	to: To;
	children: React.ReactNode;
} & NavLinkProps;

const NavLink = ({ className, classNameActive, classNameNotActive, to, children, ...props }: Props, ref: React.ForwardedRef<HTMLAnchorElement>) => (
	<ReactNavLink {...props} className={({ isActive }) => classNames(className, isActive ? classNameActive : classNameNotActive)} to={to} ref={ref} end>
		{children}
	</ReactNavLink>
);

export default forwardRef(NavLink);
