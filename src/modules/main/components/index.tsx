import NavbarComponent from './navbar';
import SidebarComponent from './sidebar';
import MainRouter from './router';
import classNames from 'classnames';
import { selectAppSidebar } from 'store/app/selectors';
import useAppSelector from 'hooks/useAppSelector';
import { useRoutes } from 'react-router-dom';
import FooterComponent from './footer';
import { selectAuthCurrent } from 'store/auth/selectors';

type Props = {};

const MainComponent: React.FC<Props> = () => {
	const appSidebar = useAppSelector(selectAppSidebar);
	const authCurrent = useAppSelector(selectAuthCurrent);
	console.log('MainComponent');

	return (
		<div
			className={classNames({
				'sidebar-collapse': appSidebar
			})}
		>
			<NavbarComponent />
			<SidebarComponent />
			<div
				className={classNames('main transition-all ease-in-out duration-500', {
					'mt-14': authCurrent.data?.setting.navbar === 'fixed',
					'mt-0': authCurrent.data?.setting.navbar === 'static'
				})}
			>
				<div className="xl:container mx-auto px-0 sm:px-4 py-4">{useRoutes(MainRouter)}</div>
			</div>
			<FooterComponent />
		</div>
	);
};

export default MainComponent;
