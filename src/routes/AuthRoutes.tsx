import { lazy } from 'react';

import AccessControl from 'src/components/AccessControl/components';
import ErrorBoundary from 'src/components/ErrorBoundary/components';
import Loadable from 'src/components/Loadable/components';
import * as routeConstant from 'src/constants/route';

const AuthLayout = Loadable(lazy(() => import('src/layouts/AuthLayout')));
const SignInPage = Loadable(lazy(() => import('src/views/auth/sign-in')));
const SignUpPage = Loadable(lazy(() => import('src/views/auth/sign-up')));

const AuthRoutes = {
	path: `${routeConstant.ROUTE_NAME_AUTH}`,
	element: (
		<ErrorBoundary>
			<AccessControl>
				<AuthLayout />
			</AccessControl>
		</ErrorBoundary>
	),
	children: [
		{
			path: `${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`,
			element: <SignInPage />
		},
		{
			path: `${routeConstant.ROUTE_NAME_AUTH_SIGN_UP}`,
			element: <SignUpPage />
		}
	]
};

export default AuthRoutes;
