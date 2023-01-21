import { lazy } from 'react';

import MainLayout from 'src/layout/MainLayout';
import Loadable from 'src/ui-component/Loadable';
import AuthGuard from 'src/utils/route-guard/AuthGuard';

const SamplePage = Loadable(lazy(() => import('src/views/sample-page')));

const MainRoutes = {
	path: '/',
	element: (
		<AuthGuard>
			<MainLayout />
		</AuthGuard>
	),
	children: [
		{
			path: '/',
			element: <SamplePage />
		},
		{
			path: '/sample-page',
			element: <SamplePage />
		},
		{
			path: '/pages/under-construction',
			element: <SamplePage />
		},
		{
			path: '/pages/coming-soon2',
			element: <SamplePage />
		}
	]
};

export default MainRoutes;
