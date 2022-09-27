import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import Loadable from 'src/components/Loadable/components';
import RoleRoute from 'src/components/RoleRoute/components';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';

const EditListUserComponent = Loadable(lazy(() => import('./edit/components')));
const NewListUserComponent = Loadable(lazy(() => import('./new/components')));

const ListUserRouter = () => {
	const routes: RouteObject[] = [
		{
			path: '',
			element: null
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`,
			element: (
				<RoleRoute roles={[...userConstant.USER_ROLE_ALL]}>
					<NewListUserComponent />
				</RoleRoute>
			)
		},
		{
			path: `:userId/${routeConstant.ROUTE_NAME_MAIN_USER_EDIT}`,
			element: (
				<RoleRoute roles={[...userConstant.USER_ROLE_ALL]}>
					<EditListUserComponent />
				</RoleRoute>
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
