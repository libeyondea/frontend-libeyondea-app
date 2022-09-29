import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import AccessControl from './accessControl';
import ErrorBoundary from 'src/components/ErrorBoundary/components';
import Loadable from 'src/components/Loadable/components';
import * as routeConstant from 'src/constants/route';

const AuthComponent = Loadable(lazy(() => import('src/modules/auth/components')));
const MainComponent = Loadable(lazy(() => import('src/modules/main/components')));

const rootRouter = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`} />
	},
	{
		path: `/${routeConstant.ROUTE_NAME_AUTH}/*`,
		element: (
			<ErrorBoundary>
				<AccessControl>
					<AuthComponent />
				</AccessControl>
			</ErrorBoundary>
		)
	},
	{
		path: `/${routeConstant.ROUTE_NAME_MAIN}/*`,
		element: (
			<ErrorBoundary>
				<AccessControl>
					<MainComponent />
				</AccessControl>
			</ErrorBoundary>
		)
	},
	{
		path: '*',
		element: <Navigate to="/" />
	}
]);

export default rootRouter;
