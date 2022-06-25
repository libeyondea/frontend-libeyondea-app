import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import AccessControl from './accessControl';
import ErrorBoundary from 'src/components/ErrorBoundary/components';
import * as routeConstant from 'src/constants/route';

const SplashComponent = lazy(() => import('src/modules/splash/components'));
const AuthComponent = lazy(() => import('src/modules/auth/components'));
const MainComponent = lazy(() => import('src/modules/main/components'));

const RootRouter = () => {
	const routes: RouteObject[] = [
		{
			path: `${routeConstant.ROUTE_NAME_SPLASH}`,
			element: (
				<Suspense fallback={null}>
					<ErrorBoundary>
						<SplashComponent />
					</ErrorBoundary>
				</Suspense>
			)
		},
		{
			path: `/${routeConstant.ROUTE_NAME_AUTH}/*`,
			element: (
				<Suspense fallback={null}>
					<ErrorBoundary>
						<AccessControl>
							<AuthComponent />
						</AccessControl>
					</ErrorBoundary>
				</Suspense>
			)
		},
		{
			path: `/${routeConstant.ROUTE_NAME_MAIN}/*`,
			element: (
				<Suspense fallback={null}>
					<ErrorBoundary>
						<AccessControl>
							<MainComponent />
						</AccessControl>
					</ErrorBoundary>
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
