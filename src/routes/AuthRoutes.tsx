import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import GuestGuard from './guard/GuestGuard';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Loadable from 'src/components/Loadable';
import * as routeConstant from 'src/constants/route';

const AuthLayout = Loadable(lazy(() => import('src/layouts/AuthLayout')));
const SignInPage = Loadable(lazy(() => import('src/views/auth/sign-in')));
const SignUpPage = Loadable(lazy(() => import('src/views/auth/sign-up')));

const AuthRoutes: RouteObject = {
	path: '/',
	element: (
		<ErrorBoundary>
			<GuestGuard>
				<AuthLayout />
			</GuestGuard>
		</ErrorBoundary>
	),
	children: [
		{
			path: `/${routeConstant.ROUTE_NAME_SIGN_IN}`,
			element: <SignInPage />
		},
		{
			path: `/${routeConstant.ROUTE_NAME_SIGN_UP}`,
			element: <SignUpPage />
		}
	]
};

export default AuthRoutes;
