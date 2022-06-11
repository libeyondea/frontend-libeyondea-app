import { Navigate } from 'react-router-dom';
import * as routeConstant from 'constants/route';
import { lazy, Suspense } from 'react';

import type { RouteObject } from 'react-router-dom';

const SignInCompoment = lazy(() => import('./signIn/components'));
const SignUpComponent = lazy(() => import('./signUp/components'));

const AuthRouter: RouteObject[] = [
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

export default AuthRouter;
