import { lazy } from 'react';

import MinimalLayout from 'src/layout/MinimalLayout';
import NavMotion from 'src/layout/NavMotion';
import Loadable from 'src/ui-component/Loadable';
import GuestGuard from 'src/utils/route-guard/GuestGuard';

const AuthLogin = Loadable(lazy(() => import('src/views/pages/authentication/Login3')));
const AuthRegister = Loadable(lazy(() => import('src/views/pages/authentication/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('src/views/pages/authentication/ForgotPassword3')));

const LoginRoutes = {
	path: '/',
	element: (
		<NavMotion>
			<GuestGuard>
				<MinimalLayout />
			</GuestGuard>
		</NavMotion>
	),
	children: [
		{
			path: '/',
			element: <AuthLogin />
		},
		{
			path: '/login',
			element: <AuthLogin />
		},
		{
			path: '/register',
			element: <AuthRegister />
		},
		{
			path: '/forgot',
			element: <AuthForgotPassword />
		}
	]
};

export default LoginRoutes;
