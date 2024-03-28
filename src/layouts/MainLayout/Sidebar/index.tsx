import _ from 'lodash';

import Logo from 'src/assets/images/logo.png';
import { CogIcon, ListIcon, PlusCircleIcon, TachometerIcon } from 'src/components/Icon';
import Image from 'src/components/Image';
import Link from 'src/components/Link';
import NavLink from 'src/components/NavLink';
import config from 'src/config';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';
import { useSelector } from 'src/store';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const Sidebar = () => {
	const authCurrent = useSelector(selectAuthCurrent);

	return (
		<aside className="min-h-screen w-64 bg-base-200">
			<div className="sticky top-0 z-20 bg-base-200 bg-opacity-90 px-4 py-2 shadow-sm backdrop-blur">
				<Link to="/" className="btn btn-ghost px-4">
					<div className="flex items-center text-lg text-primary transition-all duration-200 md:text-2xl">
						<Image className="h-8 w-8 rounded-full" src={Logo} alt={config.APP_NAME} />
						<span className="ml-2 font-bold capitalize tracking-tighter">{config.APP_NAME}</span>
					</div>
				</Link>
			</div>
			<div className="h-4"></div>
			{_.includes([userConstant.USER_ROLE_OWNER], authCurrent.data.user?.role.name) && (
				<ul className="menu p-0 px-4">
					<li>
						<NavLink to={`/${routeConstant.ROUTE_NAME_DASHBOARD}`} classNameActive="active">
							<TachometerIcon className="h-6 w-6" />
							Dashboard
						</NavLink>
					</li>
				</ul>
			)}
			{_.includes([userConstant.USER_ROLE_OWNER], authCurrent.data.user?.role.name) && (
				<ul className="menu flex flex-col p-0 px-4">
					<li className="menu-title">
						<span>Users</span>
					</li>
					<li>
						<NavLink to={`/${routeConstant.ROUTE_NAME_USER}`} classNameActive="active">
							<ListIcon className="h-6 w-6" />
							List
						</NavLink>
					</li>
					<li>
						<NavLink to={`/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_NEW}`} classNameActive="active">
							<PlusCircleIcon className="h-6 w-6" />
							New
						</NavLink>
					</li>
				</ul>
			)}
			<ul className="menu p-0 px-4">
				<li className="menu-title">
					<span>More</span>
				</li>
				<li>
					<NavLink to={`/${routeConstant.ROUTE_NAME_SETTING}`} classNameActive="active">
						<CogIcon className="h-6 w-6" />
						Settings
					</NavLink>
				</li>
			</ul>
		</aside>
	);
};

export default Sidebar;
