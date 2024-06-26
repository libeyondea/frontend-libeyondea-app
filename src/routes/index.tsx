import _ from 'lodash';
import { useMemo } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import { useSelector } from 'src/store';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const Routes = () => {
	const authCurrent = useSelector(selectAuthCurrent);

	const mainRoutesChildrenWithRole = useMemo(
		() => _.filter(MainRoutes.children, (c) => _.includes(c.roles, authCurrent.data.user?.role?.name)),
		[authCurrent.data.user?.role?.name]
	);

	const router = createBrowserRouter([
		{
			path: MainRoutes.path,
			element: MainRoutes.element,
			children: mainRoutesChildrenWithRole
		},
		AuthRoutes,
		{
			path: '*',
			element: <Navigate to="/" />
		}
	]);

	return <RouterProvider router={router} />;
};

export default Routes;
