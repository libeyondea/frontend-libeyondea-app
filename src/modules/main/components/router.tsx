import { Navigate } from 'react-router-dom';
import * as routeConstant from 'constants/route';
import { lazy, Suspense } from 'react';

import type { RouteObject } from 'react-router-dom';

const HomeComponent = lazy(() => import('./home/components'));
const SettingComponent = lazy(() => import('./setting/components'));
const UserComponent = lazy(() => import('./user/components'));

const MainRouter: RouteObject[] = [
	{
		path: `${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`,
		element: (
			<Suspense fallback={null}>
				<HomeComponent />
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
		path: '*',
		element: <Navigate to={`${routeConstant.ROUTE_NAME_SPLASH}`} />
	}
];

export default MainRouter;
