import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

import Breadcrumb from './Breadcrumb';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import useTheme from 'src/hooks/useTheme';
import { useSelector } from 'src/store';
import { selectAppSidebar } from 'src/store/app/selectors';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const MainLayout = () => {
	const appSidebar = useSelector(selectAppSidebar);
	const authCurrent = useSelector(selectAuthCurrent);

	useTheme(authCurrent.data.user?.setting.theme);

	return (
		<div>
			<Navbar />
			<Sidebar />
			<main className={classNames('mt-14 px-0 py-4 transition-all duration-500 ease-in-out sm:px-4', appSidebar ? 'lg:ml-64' : 'ml-0')}>
				<div className="mx-auto xl:container">
					<Breadcrumb />
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
