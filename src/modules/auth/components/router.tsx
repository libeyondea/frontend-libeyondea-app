import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';

const SignInCompoment = lazy(() => import('./signIn/components'));
const SignUpComponent = lazy(() => import('./signUp/components'));

const AuthRouter = () => {
	const routes: RouteObject[] = [
		{
			path: `${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`,
			element: (
				<Suspense fallback={null}>
					<SignInCompoment />
				</Suspense>
			)
		},
		{
			path: `${routeConstant.ROUTE_NAME_AUTH_SIGN_UP}`,
			element: (
				<Suspense fallback={null}>
					<SignUpComponent />
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

export default AuthRouter;
