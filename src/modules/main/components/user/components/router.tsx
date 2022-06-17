import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';

const ListUserComponent = lazy(() => import('./list/components'));

const UserRouter = () => {
	const routes: RouteObject[] = [
		{
			path: '/*',
			element: (
				<Suspense fallback={null}>
					<ListUserComponent />
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

export default UserRouter;
