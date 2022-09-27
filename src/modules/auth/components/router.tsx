import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import Loadable from 'src/components/Loadable/components';
import * as routeConstant from 'src/constants/route';

const SignInCompoment = Loadable(lazy(() => import('./signIn/components')));
const SignUpComponent = Loadable(lazy(() => import('./signUp/components')));

const AuthRouter = () => {
	const routes: RouteObject[] = [
		{
			path: `${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`,
			element: <SignInCompoment />
		},
		{
			path: `${routeConstant.ROUTE_NAME_AUTH_SIGN_UP}`,
			element: <SignUpComponent />
		},
		{
			path: '*',
			element: <Navigate to={`${routeConstant.ROUTE_NAME_SPLASH}`} />
		}
	];

	return useRoutes(routes);
};

export default AuthRouter;
