import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';

const EditListUserComponent = lazy(() => import('./edit/components'));
const NewListUserComponent = lazy(() => import('./new/components'));

const ListUserRouter = () => {
	const routes: RouteObject[] = [
		{
			path: '',
			element: null
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`,
			element: (
				<Suspense fallback={null}>
					<NewListUserComponent />
				</Suspense>
			)
		},
		{
			path: `:userId/${routeConstant.ROUTE_NAME_MAIN_USER_EDIT}`,
			element: (
				<Suspense fallback={null}>
					<EditListUserComponent />
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

export default ListUserRouter;
