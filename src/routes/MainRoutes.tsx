import { lazy } from 'react';

import AccessControl from 'src/components/AccessControl/components';
import ErrorBoundary from 'src/components/ErrorBoundary/components';
import Loadable from 'src/components/Loadable/components';
import RoleRoute from 'src/components/RoleRoute/components';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';

const MainLayout = Loadable(lazy(() => import('src/layouts/MainLayout')));
const DashboardPage = Loadable(lazy(() => import('src/views/main/dashboard')));
const UserPage = Loadable(lazy(() => import('src/views/main/user')));
const NewUserPage = Loadable(lazy(() => import('src/views/main/user/new')));
const EditUserPage = Loadable(lazy(() => import('src/views/main/user/edit')));
const SettingPage = Loadable(lazy(() => import('src/views/main/setting')));
const ProfilePage = Loadable(lazy(() => import('src/views/main/profile')));

const MainRoutes = {
	path: `${routeConstant.ROUTE_NAME_MAIN}`,
	element: (
		<ErrorBoundary>
			<AccessControl>
				<MainLayout />
			</AccessControl>
		</ErrorBoundary>
	),
	children: [
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`,
			element: (
				<RoleRoute roles={[...userConstant.USER_ROLE_ALL]}>
					<DashboardPage />
				</RoleRoute>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_USER}`,
			element: (
				<RoleRoute roles={[userConstant.USER_ROLE_OWNER]}>
					<UserPage />
				</RoleRoute>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_USER}/${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`,
			element: (
				<RoleRoute roles={[userConstant.USER_ROLE_OWNER]}>
					<NewUserPage />
				</RoleRoute>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_USER}/:userId/${routeConstant.ROUTE_NAME_MAIN_USER_EDIT}`,
			element: (
				<RoleRoute roles={[userConstant.USER_ROLE_OWNER]}>
					<EditUserPage />
				</RoleRoute>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_SETTING}`,
			element: (
				<RoleRoute roles={[...userConstant.USER_ROLE_ALL]}>
					<SettingPage />
				</RoleRoute>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_PROFILE}`,
			element: (
				<RoleRoute roles={[...userConstant.USER_ROLE_ALL]}>
					<ProfilePage />
				</RoleRoute>
			)
		}
	]
};

export default MainRoutes;
