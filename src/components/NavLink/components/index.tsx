import classNames from 'classnames';
import { NavLink, NavLinkProps, To } from 'react-router-dom';

type Props = {
	className?: string;
	activeClassName: string;
	notActiveClassName?: string;
	to: To;
	children: React.ReactNode;
} & NavLinkProps;

const NavLinkComponent: React.FC<Props> = ({ className, activeClassName, notActiveClassName, to, children, ...props }) => (
	<NavLink
		{...props}
		to={to}
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
