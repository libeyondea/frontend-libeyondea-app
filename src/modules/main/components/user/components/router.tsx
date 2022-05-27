import { Navigate } from 'react-router-dom';
import * as routeConstant from 'constants/route';
import { lazy, Suspense } from 'react';

import type { RouteObject } from 'react-router-dom';

const ListUserComponent = lazy(() => import('./list/components'));

const UserRouter: RouteObject[] = [
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

export default UserRouter;
