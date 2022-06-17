import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';

const DashboardComponent = lazy(() => import('./dashboard/components'));
const SettingComponent = lazy(() => import('./setting/components'));
const UserComponent = lazy(() => import('./user/components'));
const ProfileComponent = lazy(() => import('./profile/components'));

const MainRouter = () => {
	const routes: RouteObject[] = [
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`,
			element: (
				<Suspense fallback={null}>
					<DashboardComponent />
				</Suspense>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_SETTING}`,
			element: (
				<Suspense fallback={null}>
					<SettingComponent />
				</Suspense>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_USER}/*`,
			element: (
				<Suspense fallback={null}>
					<UserComponent />
				</Suspense>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_PROFILE}`,
			element: (
				<Suspense fallback={null}>
					<ProfileComponent />
				</Suspense>
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
