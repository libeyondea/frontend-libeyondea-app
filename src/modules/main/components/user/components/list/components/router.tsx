import { Navigate } from 'react-router-dom';
import * as routeConstant from 'constants/route';
import { lazy, Suspense } from 'react';

import type { RouteObject } from 'react-router-dom';

const EditListUserComponent = lazy(() => import('./edit/components'));
const NewListUserComponent = lazy(() => import('./new/components'));

const ListUserRouter: RouteObject[] = [
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

export default ListUserRouter;
