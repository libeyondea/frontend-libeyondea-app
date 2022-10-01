import { Navigate, createBrowserRouter } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';

const Routes = createBrowserRouter([
	MainRoutes,
	AuthRoutes,
	{
		path: '*',
		element: <Navigate to="/" />
	}
]);

export default Routes;
