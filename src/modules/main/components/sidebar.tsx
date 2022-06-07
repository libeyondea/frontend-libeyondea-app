import classNames from 'classnames';
import LinkComponent from 'components/Link/components';
import { appSidebarRequestAction } from 'store/app/actions';
import ImageComponent from 'components/Image/components';
import config from 'config';
import * as routeConstant from 'constants/route';
import * as userConstant from 'constants/user';
import useAppDispatch from 'hooks/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { Disclosure, Transition } from '@headlessui/react';
import NavLinkComponent from 'components/NavLink/components';
import { FaChevronLeft, FaCog, FaEllipsisH, FaPlusCircle, FaRegListAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { Fragment } from 'react';
import useAppSelector from 'hooks/useAppSelector';
import { selectAuthCurrent } from 'store/auth/selectors';

type Props = {};

const SidebarComponent: React.FC<Props> = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const authCurrent = useAppSelector(selectAuthCurrent);

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
							<LinkComponent href="/" className="flex items-center text-left focus:outline-none">
								<ImageComponent className="rounded-full h-8 w-8" src={config.LOGO_URL} alt={config.APP_NAME} />
								<h2 className="text-lg text-white font-bold tracking-tighter cursor-pointer ml-3">{config.APP_NAME}</h2>
							</LinkComponent>
						</div>
					</div>
					<div className="flex flex-col overflow-y-auto p-4 mt-14">
						<nav className="flex-1 bg-gray-800">
							<ul className="space-y-3">
								<li>
									<NavLinkComponent
										href={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`}
										className="inline-flex items-center w-full px-4 py-2 text-base rounded-lg focus:shadow-outline"
										activeClassName="bg-gray-500 hover:bg-gray-500 font-bold text-white"
										notActiveClassName="hover:bg-gray-900 hover:text-white text-gray-400"
									>
										<FaTachometerAlt className="w-6 h-6" />
										<span className="ml-4">Dashboard</span>
									</NavLinkComponent>
								</li>
								{authCurrent.data?.role && [userConstant.USER_ROLE_OWNER].includes(authCurrent.data.role) && (
									<Disclosure
										as="li"
										defaultOpen={[
											`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`,
											`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}/${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`
										].includes(location.pathname)}
									>
										{({ open }) => (
											<Fragment>
												<Disclosure.Button
													className={classNames(
														'inline-flex items-center w-full px-4 py-2 text-base rounded-lg focus:shadow-outline hover:bg-gray-900 hover:text-white',
														[
															`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`,
															`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}/${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`
														].includes(location.pathname)
															? 'bg-gray-900 text-white'
															: 'text-gray-400'
													)}
												>
													<FaUsers className="w-6 h-6" />
													<span className="ml-4">Users</span>
													<FaChevronLeft
														className={classNames('w-6 h-6 ml-auto', {
															'transform -rotate-90': open
														})}
													/>
												</Disclosure.Button>
												<Transition
													as={Fragment}
													show={open}
													enter="transition duration-100 ease-out"
													enterFrom="transform scale-95 opacity-0"
													enterTo="transform scale-100 opacity-100"
													leave="transition duration-75 ease-out"
													leaveFrom="transform scale-100 opacity-100"
													leaveTo="transform scale-95 opacity-0"
												>
													<Disclosure.Panel static as="ul" className="space-y-4 mt-4">
														<li>
															<NavLinkComponent
																href={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`}
																className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
																activeClassName="bg-gray-500 hover:bg-gray-500 font-bold text-white"
																notActiveClassName="hover:bg-gray-900 hover:text-white text-gray-400"
															>
																<FaRegListAlt className="w-6 h-6" />
																<span className="ml-4">List</span>
															</NavLinkComponent>
														</li>
														<li>
															<NavLinkComponent
																href={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}/${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`}
																className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
																activeClassName="bg-gray-500 hover:bg-gray-500 font-bold text-white"
																notActiveClassName="hover:bg-gray-900 hover:text-white text-gray-400"
															>
																<FaPlusCircle className="w-6 h-6" />
																<span className="ml-4">New</span>
															</NavLinkComponent>
														</li>
													</Disclosure.Panel>
												</Transition>
											</Fragment>
										)}
									</Disclosure>
								)}
								<Disclosure
									as="li"
									defaultOpen={[`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_SETTING}`].includes(location.pathname)}
								>
									{({ open }) => (
										<Fragment>
											<Disclosure.Button
												className={classNames(
													'inline-flex items-center w-full px-4 py-2 text-base rounded-lg focus:shadow-outline hover:bg-gray-900 hover:text-white',
													[`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_SETTING}`].includes(location.pathname)
														? 'bg-gray-900 text-white'
														: 'text-gray-400'
												)}
											>
												<FaEllipsisH className="w-6 h-6" />
												<span className="ml-4">More</span>
												<FaChevronLeft
													className={classNames('w-6 h-6 ml-auto', {
														'transform -rotate-90': open
													})}
												/>
											</Disclosure.Button>
											<Transition
												as={Fragment}
												show={open}
												enter="transition duration-100 ease-out"
												enterFrom="transform scale-95 opacity-0"
												enterTo="transform scale-100 opacity-100"
												leave="transition duration-75 ease-out"
												leaveFrom="transform scale-100 opacity-100"
												leaveTo="transform scale-95 opacity-0"
											>
												<Disclosure.Panel static as="ul" className="space-y-4 mt-4">
													<li>
														<NavLinkComponent
															href={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_SETTING}`}
															className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
															activeClassName="bg-gray-500 hover:bg-gray-500 font-bold text-white"
															notActiveClassName="hover:bg-gray-900 hover:text-white text-gray-400"
														>
															<FaCog className="w-6 h-6" />
															<span className="ml-4">Settings</span>
														</NavLinkComponent>
													</li>
												</Disclosure.Panel>
											</Transition>
										</Fragment>
									)}
								</Disclosure>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SidebarComponent;
