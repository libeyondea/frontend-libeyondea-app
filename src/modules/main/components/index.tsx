import classNames from 'classnames';
import { Fragment } from 'react';

import FooterComponent from './footer';
import NavbarComponent from './navbar';
import MainRouter from './router';
import SidebarComponent from './sidebar';
import useAppSelector from 'src/hooks/useAppSelector';
import { selectAppSidebar } from 'src/store/app/selectors';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const MainComponent = () => {
	const appSidebar = useAppSelector(selectAppSidebar);
	const authCurrent = useAppSelector(selectAuthCurrent);

	return (
		<Fragment>
			<NavbarComponent />
			<SidebarComponent />
			<main
				className={classNames(
					'transition-all ease-in-out duration-500',
					appSidebar ? 'lg:ml-64' : 'ml-0',
					authCurrent.data?.setting.fixed_navbar ? 'mt-14' : 'mt-0',
					authCurrent.data?.setting.fixed_footer ? 'mb-16' : 'mb-0'
				)}
			>
				<div className="xl:container mx-auto px-0 sm:px-4 py-4">
					<MainRouter />
				</div>
			</main>
			<FooterComponent />
		</Fragment>
	);
};

export default MainComponent;
