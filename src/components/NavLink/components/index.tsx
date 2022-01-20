import classNames from 'classnames';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface Props extends NavLinkProps {
	activeClassName: string;
	notActiveClassName?: string;
}

const NavLinkComponent: React.FC<Props> = ({ className, activeClassName, notActiveClassName, to, children, ...props }) => (
	<NavLink
		to={to}
		className={({ isActive }) =>
			classNames(className, {
				[activeClassName]: isActive,
				...(notActiveClassName && { [notActiveClassName]: !isActive })
			})
		}
		end
		{...props}
	>
		{children}
	</NavLink>
);

export default NavLinkComponent;
