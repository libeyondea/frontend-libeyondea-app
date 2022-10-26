import { lazy } from 'react';

import DefaultPath from './DefaultPath';
import AuthGuard from './guard/AuthGuard';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Loadable from 'src/components/Loadable';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';
import { RouteObjectWithRole } from 'src/types/router';

const MainLayout = Loadable(lazy(() => import('src/layouts/MainLayout')));
const ProfilePage = Loadable(lazy(() => import('src/views/main/profile')));
const DashboardPage = Loadable(lazy(() => import('src/views/main/dashboard')));
const UserPage = Loadable(lazy(() => import('src/views/main/user')));
const NewUserPage = Loadable(lazy(() => import('src/views/main/user/new')));
const EditUserPage = Loadable(lazy(() => import('src/views/main/user/edit')));
const SettingPage = Loadable(lazy(() => import('src/views/main/setting')));

const MainRoutes: RouteObjectWithRole = {
	path: '/',
	element: (
		<ErrorBoundary>
			<AuthGuard>
				<MainLayout />
			</AuthGuard>
		</ErrorBoundary>
	),
	children: [
		{
			path: '/',
			element: <DefaultPath />,
			roles: [...userConstant.USER_ROLE_ALL]
		},
		{
			path: `/${routeConstant.ROUTE_NAME_DASHBOARD}`,
			element: <DashboardPage />,
			roles: [userConstant.USER_ROLE_OWNER]
		},
		{
			path: `/${routeConstant.ROUTE_NAME_USER}`,
			element: <UserPage />,
			roles: [userConstant.USER_ROLE_OWNER]
		},
		{
			path: `/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_NEW}`,
			element: <NewUserPage />,
			roles: [userConstant.USER_ROLE_OWNER]
		},
		{
			path: `/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_EDIT}`,
			element: <EditUserPage />,
			roles: [userConstant.USER_ROLE_OWNER]
		},
		{
			path: `/${routeConstant.ROUTE_NAME_PROFILE}`,
			element: <ProfilePage />,
			roles: [...userConstant.USER_ROLE_ALL]
		},
		{
			path: `/${routeConstant.ROUTE_NAME_SETTING}`,
			element: <SettingPage />,
			roles: [...userConstant.USER_ROLE_ALL]
		}
	]
};

export default MainRoutes;
