import NavbarComponent from './navbar';
import SidebarComponent from './sidebar';
import MainRouter from './router';
import classNames from 'classnames';
import { selectAppSidebar } from 'store/app/selectors';
import useAppSelector from 'hooks/useAppSelector';
import { useRoutes } from 'react-router-dom';
import FooterComponent from './footer';

type Props = {};

const MainComponent: React.FC<Props> = () => {
	const appSidebar = useAppSelector(selectAppSidebar);
	console.log('MainComponent');

	return (
		<div
			className={classNames({
				'sidebar-collapse': appSidebar
			})}
		>
			<NavbarComponent />
			<SidebarComponent />
			<div className="main mt-14 transition-all ease-in-out duration-500">
				<div className="xl:container mx-auto px-0 sm:px-4 py-4">{useRoutes(MainRouter)}</div>
			</div>
			<FooterComponent />
		</div>
	);
};

export default MainComponent;
