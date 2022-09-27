import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import Loadable from 'src/components/Loadable/components';
import RoleRoute from 'src/components/RoleRoute/components';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';

const ListUserComponent = Loadable(lazy(() => import('./list/components')));

const UserRouter = () => {
	const routes: RouteObject[] = [
		{
			path: '/*',
			element: (
				<RoleRoute roles={[...userConstant.USER_ROLE_ALL]}>
					<ListUserComponent />
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

export default UserRouter;
