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
		<aside className="bg-base-200 w-64">
			<div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 px-4 py-2 shadow-sm">
				<Link to="/" className="btn btn-ghost px-4">
					<div className="flex items-center text-primary transition-all duration-200 text-lg md:text-2xl">
						<Image className="rounded-full h-8 w-8" src={Logo} alt={config.APP_NAME} />
						<span className="capitalize tracking-tighter font-bold ml-2">{config.APP_NAME}</span>
					</div>
				</Link>
			</div>
			<div className="h-4"></div>
			<ul className="menu p-0 px-4">
				<li>
					<NavLink to={`/${routeConstant.ROUTE_NAME_DASHBOARD}`} classNameActive="active">
						<TachometerIcon className="w-6 h-6" />
						Dashboard
					</NavLink>
				</li>
			</ul>
			{_.includes([userConstant.USER_ROLE_OWNER], authCurrent.data.user?.role) && (
				<ul className="menu flex flex-col p-0 px-4">
					<li></li>
					<li className="menu-title">
						<span>Users</span>
					</li>
					<li>
						<NavLink to={`/${routeConstant.ROUTE_NAME_USER}`} classNameActive="active">
							<ListIcon className="w-6 h-6" />
							List
						</NavLink>
					</li>
					<li>
						<NavLink to={`/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_NEW}`} classNameActive="active">
							<PlusCircleIcon className="w-6 h-6" />
							New
						</NavLink>
					</li>
				</ul>
			)}
			<ul className="menu p-0 px-4">
				<li></li>
				<li className="menu-title">
					<span>More</span>
				</li>
				<li>
					<NavLink to={`/${routeConstant.ROUTE_NAME_SETTING}`} classNameActive="active">
						<CogIcon className="w-6 h-6" />
						Settings
					</NavLink>
				</li>
			</ul>
		</aside>
	);
};

export default Sidebar;
