import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import Loadable from 'src/components/Loadable/components';
import RoleRoute from 'src/components/RoleRoute/components';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';

const DashboardComponent = Loadable(lazy(() => import('./dashboard/components')));
const SettingComponent = Loadable(lazy(() => import('./setting/components')));
const UserComponent = Loadable(lazy(() => import('./user/components')));
const ProfileComponent = Loadable(lazy(() => import('./profile/components')));

const MainRouter = () => {
	const routes: RouteObject[] = [
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`,
			element: (
				<RoleRoute roles={[...userConstant.USER_ROLE_ALL]}>
					<DashboardComponent />
				</RoleRoute>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_PROFILE}`,
			element: (
				<RoleRoute roles={[...userConstant.USER_ROLE_ALL]}>
					<ProfileComponent />
				</RoleRoute>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_SETTING}`,
			element: (
				<RoleRoute roles={[...userConstant.USER_ROLE_ALL]}>
					<SettingComponent />
				</RoleRoute>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_USER}/*`,
			element: (
				<RoleRoute roles={[userConstant.USER_ROLE_OWNER]}>
					<UserComponent />
				</RoleRoute>
			)
		},
		{
			path: '*',
			element: <Navigate to={routeConstant.ROUTE_NAME_SPLASH} />
		}
	];

	return useRoutes(routes);
};

export default MainRouter;
