import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import useChangeTheme from 'src/hooks/useChangeTheme';
import { useSelector } from 'src/store';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const MainLayout = () => {
	const authCurrent = useSelector(selectAuthCurrent);

	useChangeTheme(authCurrent.data.user?.setting.theme);

	return (
		<div className="drawer drawer-mobile">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<Navbar />
				<main className="px-0 sm:px-4 py-4">
					<div className="xl:container">
						<Outlet />
					</div>
				</main>
				<Footer />
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer" className="drawer-overlay"></label>
				<Sidebar />
			</div>
		</div>
	);
};

export default MainLayout;
