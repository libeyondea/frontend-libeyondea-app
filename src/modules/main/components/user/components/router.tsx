import { Navigate } from 'react-router-dom';
import * as routeConstant from 'constants/route';
import { lazy, Suspense } from 'react';

import type { RouteObject } from 'react-router-dom';

const ListUserComponent = lazy(() => import('./list/components'));
const NewUserComponent = lazy(() => import('./new/components'));
const EditUserComponent = lazy(() => import('./edit/components'));

const UserRouter: RouteObject[] = [
	{
		path: '',
		element: (
			<Suspense fallback={null}>
				<ListUserComponent />
			</Suspense>
		)
	},
	{
		path: `${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`,
		element: (
			<Suspense fallback={null}>
				<NewUserComponent />
			</Suspense>
		)
	},
	{
		path: `:userId/${routeConstant.ROUTE_NAME_MAIN_USER_EDIT}`,
		element: (
			<Suspense fallback={null}>
				<EditUserComponent />
			</Suspense>
		)
	},
	{
		path: '*',
		element: <Navigate to={`${routeConstant.ROUTE_NAME_SPLASH}`} />
	}
];

export default UserRouter;
