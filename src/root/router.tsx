import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import AccessControl from './accessControl';
import * as routeConstant from 'constants/route';

const AuthComponent = lazy(() => import('modules/auth/components'));
const MainComponent = lazy(() => import('modules/main/components'));
const SplashComponent = lazy(() => import('modules/splash/components'));

const RootRouter = () => {
	const routes: RouteObject[] = [
		{
			path: `${routeConstant.ROUTE_NAME_SPLASH}`,
			element: (
				<Suspense fallback={null}>
					<SplashComponent />
				</Suspense>
			)
		},
		{
			path: `/${routeConstant.ROUTE_NAME_AUTH}/*`,
			element: (
				<Suspense fallback={null}>
					<AccessControl>
						<AuthComponent />
					</AccessControl>
				</Suspense>
			)
		},
		{
			path: `/${routeConstant.ROUTE_NAME_MAIN}/*`,
			element: (
				<Suspense fallback={null}>
					<AccessControl>
						<MainComponent />
					</AccessControl>
				</Suspense>
			)
		},
		{
			path: '*',
			element: <Navigate to={`${routeConstant.ROUTE_NAME_SPLASH}`} />
		}
	];

	return useRoutes(routes);
};

export default RootRouter;
