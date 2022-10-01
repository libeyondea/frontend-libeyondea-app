import classNames from 'classnames';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector } from 'src/store';
import { selectAppSidebar } from 'src/store/app/selectors';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const MainLayout = () => {
	const appSidebar = useSelector(selectAppSidebar);
	const authCurrent = useSelector(selectAuthCurrent);

	return (
		<Fragment>
			<Navbar />
			<Sidebar />
			<main
				className={classNames(
					'transition-all ease-in-out duration-500',
					appSidebar ? 'lg:ml-64' : 'ml-0',
					authCurrent.data.user?.setting.fixed_navbar ? 'mt-14' : 'mt-0',
					authCurrent.data.user?.setting.fixed_footer ? 'mb-16' : 'mb-0'
				)}
			>
				<div className="xl:container mx-auto px-0 sm:px-4 py-4">
					<Outlet />
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};

export default MainLayout;
