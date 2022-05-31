import classNames from 'classnames';
import LinkComponent from 'components/Link/components';
import { appSidebarRequestAction } from 'store/app/actions';
import ImageComponent from 'components/Image/components';
import config from 'config';
import * as routeConstant from 'constants/route';
import useAppDispatch from 'hooks/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import NavLinkComponent from 'components/NavLink/components';
import { FaChevronLeft, FaCog, FaEllipsisH, FaPlusCircle, FaRegListAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { Fragment } from 'react';

type SidebarMenuProps = Array<{
	name: string;
	icon: JSX.Element;
	to: string | null;
	children: Array<{
		name: string;
		icon: JSX.Element;
		to: string;
	}>;
}>;

const sidebarMenu: SidebarMenuProps = [
	{
		name: 'Dashboard',
		icon: <FaTachometerAlt className="w-6 h-6" />,
		to: `/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`,
		children: []
	},
	{
		name: 'Users',
		icon: <FaUsers className="w-6 h-6" />,
		to: null,
		children: [
			{
				name: 'List',
				icon: <FaRegListAlt className="w-6 h-6" />,
				to: `/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`
			},
			{
				name: 'New',
				icon: <FaPlusCircle className="w-6 h-6" />,
				to: `/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}/${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`
			}
		]
	},
	{
		name: 'More',
		icon: <FaEllipsisH className="w-6 h-6" />,
		to: null,
		children: [
			{
				name: 'Settings',
				icon: <FaCog className="w-6 h-6" />,
				to: `/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_SETTING}`
			}
		]
	}
];

type Props = {};

const SidebarComponent: React.FC<Props> = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();

	return (
		<div className="sidebar flex">
			<div
				className="sidebar-event fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden block"
				onClick={() => dispatch(appSidebarRequestAction(true))}
			></div>
			<div
				className={classNames(
					'sidebar-menu fixed inset-y-0 left-0 max-w-full flex transition-all ease-in-out duration-500 flex-shrink-0 z-30 ml-0 lg:-ml-64'
				)}
			>
				<div className="flex flex-col w-64 bg-gray-800">
					<div className="bg-gray-800 flex flex-col flex-shrink-0 fixed w-64 z-50 py-3 px-7">
						<div className="flex">
							<LinkComponent to="/" className="flex items-center text-left focus:outline-none">
								<ImageComponent className="rounded-full h-8 w-8" src={config.LOGO_URL} alt={config.APP_NAME} />
								<h2 className="text-lg text-white font-bold tracking-tighter cursor-pointer ml-3">{config.APP_NAME}</h2>
							</LinkComponent>
						</div>
					</div>
					<div className="flex flex-col overflow-y-auto p-4 mt-14">
						<nav className="flex-1 bg-gray-800">
							<ul className="space-y-3">
								{sidebarMenu.map((menu, index) => (
									<Fragment key={index}>
										{!menu.children.length && menu.to && (
											<li>
												<NavLinkComponent
													to={menu.to}
													className="inline-flex items-center w-full px-4 py-2 text-base rounded-lg focus:shadow-outline"
													activeClassName="bg-gray-500 hover:bg-gray-500 font-bold text-white"
													notActiveClassName="hover:bg-gray-900 hover:text-white text-gray-400"
												>
													{menu.icon}
													<span className="ml-4">{menu.name}</span>
												</NavLinkComponent>
											</li>
										)}
										{!!menu.children.length && (
											<li>
												<Disclosure
													defaultOpen={
														!!menu.children
															.map((menu) => menu.to)
															.map((href) => href)
															.includes(location.pathname)
													}
												>
													{({ open }) => (
														<Fragment>
															<Disclosure.Button
																className={classNames(
																	'inline-flex items-center w-full px-4 py-2 text-base rounded-lg focus:shadow-outline hover:bg-gray-900 hover:text-white',
																	!!menu.children
																		.map((menu) => menu.to)
																		.map((href) => href)
																		.includes(location.pathname)
																		? 'bg-gray-900 text-white'
																		: 'text-gray-400'
																)}
															>
																{menu.icon}
																<span className="ml-4">{menu.name}</span>
																<FaChevronLeft
																	className={classNames('w-6 h-6 ml-auto', {
																		'transform -rotate-90': open
																	})}
																/>
															</Disclosure.Button>
															<Disclosure.Panel as="ul" className="space-y-4 mt-4">
																{menu.children.map((menu, index) => (
																	<li key={index}>
																		<NavLinkComponent
																			to={menu.to}
																			className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
																			activeClassName="bg-gray-500 hover:bg-gray-500 font-bold text-white"
																			notActiveClassName="hover:bg-gray-900 hover:text-white text-gray-400"
																		>
																			{menu.icon}
																			<span className="ml-4">{menu.name}</span>
																		</NavLinkComponent>
																	</li>
																))}
															</Disclosure.Panel>
														</Fragment>
													)}
												</Disclosure>
											</li>
										)}
									</Fragment>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SidebarComponent;
