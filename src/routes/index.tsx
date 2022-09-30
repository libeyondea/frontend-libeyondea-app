import { Navigate, createBrowserRouter } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import * as routeConstant from 'src/constants/route';

const Routes = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`} />
	},
	AuthRoutes,
	MainRoutes,
	{
		path: '*',
		element: <Navigate to="/" />
	}
]);

export default Routes;
