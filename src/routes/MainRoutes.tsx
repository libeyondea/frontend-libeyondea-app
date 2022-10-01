import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import DefaultPath from './DefaultPath';
import AuthGuard from './guard/AuthGuard';
import RoleBased from './rbac/RoleBased';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Loadable from 'src/components/Loadable';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';

const MainLayout = Loadable(lazy(() => import('src/layouts/MainLayout')));
const ProfilePage = Loadable(lazy(() => import('src/views/main/profile')));
const DashboardPage = Loadable(lazy(() => import('src/views/main/dashboard')));
const UserPage = Loadable(lazy(() => import('src/views/main/user')));
const NewUserPage = Loadable(lazy(() => import('src/views/main/user/new')));
const EditUserPage = Loadable(lazy(() => import('src/views/main/user/edit')));
const SettingPage = Loadable(lazy(() => import('src/views/main/setting')));

const MainRoutes: RouteObject = {
	path: '',
	element: (
		<ErrorBoundary>
			<AuthGuard>
				<MainLayout />
			</AuthGuard>
		</ErrorBoundary>
	),
	children: [
		{
			path: '',
			element: (
				<RoleBased roles={[...userConstant.USER_ROLE_ALL]}>
					<DefaultPath />
				</RoleBased>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_PROFILE}`,
			element: (
				<RoleBased roles={[...userConstant.USER_ROLE_ALL]}>
					<ProfilePage />
				</RoleBased>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`,
			element: (
				<RoleBased roles={[...userConstant.USER_ROLE_ALL]}>
					<DashboardPage />
				</RoleBased>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_USER}`,
			element: (
				<RoleBased roles={[userConstant.USER_ROLE_OWNER]}>
					<UserPage />
				</RoleBased>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`,
			element: (
				<RoleBased roles={[userConstant.USER_ROLE_OWNER]}>
					<NewUserPage />
				</RoleBased>
			)
		},
		{
			path: `:userId/${routeConstant.ROUTE_NAME_MAIN_USER_EDIT}`,
			element: (
				<RoleBased roles={[userConstant.USER_ROLE_OWNER]}>
					<EditUserPage />
				</RoleBased>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_SETTING}`,
			element: (
				<RoleBased roles={[...userConstant.USER_ROLE_ALL]}>
					<SettingPage />
				</RoleBased>
			)
		}
	]
};

export default MainRoutes;
