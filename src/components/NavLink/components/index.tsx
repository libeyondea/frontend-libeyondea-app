import classNames from 'classnames';
import { NavLink, NavLinkProps, To } from 'react-router-dom';

type Props = {
	className?: string;
	activeClassName: string;
	notActiveClassName?: string;
	href: To;
	children: React.ReactNode;
} & Omit<NavLinkProps, 'to'>;

const NavLinkComponent: React.FC<Props> = ({ className, activeClassName, notActiveClassName, href, children, ...props }) => (
	<NavLink
		{...props}
		to={href}
		className={({ isActive }) =>
			classNames(className, {
				[activeClassName]: isActive,
				...(notActiveClassName && { [notActiveClassName]: !isActive })
			})
		}
		end
	>
		{children}
	</NavLink>
);

export default NavLinkComponent;
