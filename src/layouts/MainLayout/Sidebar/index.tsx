import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import Logo from 'src/assets/images/logo.png';
import { ChevronLeftIcon, CogIcon, EllipsisHorizontalIcon, ListIcon, PlusCircleIcon, TachometerIcon, TimesIcon, UserIcon } from 'src/components/Icon';
import Image from 'src/components/Image';
import Link from 'src/components/Link';
import NavLink from 'src/components/NavLink';
import config from 'src/config';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';
import { useDispatch, useSelector } from 'src/store';
import { appSidebarRequestAction } from 'src/store/app/actions';
import { selectAppSidebar } from 'src/store/app/selectors';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const Sidebar = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const appSidebar = useSelector(selectAppSidebar);
	const authCurrent = useSelector(selectAuthCurrent);

	return (
		<div className="flex">
			<div
				className={classNames('fixed inset-0 z-20 bg-gray-900/50 lg:hidden', appSidebar ? 'hidden' : 'block')}
				onMouseDown={() => dispatch(appSidebarRequestAction(true))}
				onTouchStart={() => dispatch(appSidebarRequestAction(true))}
			/>
			<div
				className={classNames(
					'fixed inset-y-0 left-0 max-w-full flex transition-all ease-in-out duration-500 flex-shrink-0 z-30',
					appSidebar ? '-ml-64 lg:ml-0' : 'ml-0 lg:-ml-64'
				)}
			>
				<div className="flex flex-col w-64 bg-gray-800">
					<div className="bg-gray-800 flex flex-col flex-shrink-0 fixed w-64 z-50 py-3 px-7">
						<div className="flex justify-between">
							<Link to="/" className="flex items-center text-left focus:outline-none">
								<Image className="rounded-full h-8 w-8" src={Logo} alt={config.APP_NAME} />
								<h2 className="text-lg text-white font-bold tracking-tighter cursor-pointer ml-3">{config.APP_NAME}</h2>
							</Link>
							<button
								className="inline-flex items-center text-gray-400 hover:bg-gray-500 hover:text-white p-1 rounded-md lg:hidden -mr-1"
								onClick={() => dispatch(appSidebarRequestAction(true))}
							>
								<TimesIcon className="h-6 w-6" />
							</button>
						</div>
					</div>
					<div className="flex flex-col overflow-y-auto p-4 mt-14">
						<nav className="flex-1 bg-gray-800">
							<ul className="space-y-3">
								<li>
									<NavLink
										to={`/${routeConstant.ROUTE_NAME_DASHBOARD}`}
										className="inline-flex items-center w-full px-4 py-2 text-base rounded-lg focus:shadow-outline"
										classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
										classNameNotActive="hover:bg-gray-900 hover:text-white text-gray-400"
									>
										<TachometerIcon className="w-6 h-6" />
										<span className="ml-4">Dashboard</span>
									</NavLink>
								</li>
								{[userConstant.USER_ROLE_OWNER].includes(authCurrent.data.user?.role || '') && (
									<Disclosure
										as="li"
										defaultOpen={[
											`/${routeConstant.ROUTE_NAME_USER}`,
											`/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_NEW}`
										].includes(location.pathname)}
									>
										{({ open }) => (
											<Fragment>
												<Disclosure.Button
													className={classNames(
														'inline-flex items-center w-full px-4 py-2 text-base rounded-lg focus:shadow-outline hover:bg-gray-900 hover:text-white',
														[
															`/${routeConstant.ROUTE_NAME_USER}`,
															`/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_NEW}`
														].includes(location.pathname)
															? 'bg-gray-900 text-white'
															: 'text-gray-400'
													)}
												>
													<UserIcon className="w-6 h-6" />
													<span className="ml-4">Users</span>
													<ChevronLeftIcon
														className={classNames('w-6 h-6 ml-auto', {
															'transform -rotate-90': open
														})}
													/>
												</Disclosure.Button>
												<Transition
													as={Fragment}
													enter="transition duration-100 ease-out"
													enterFrom="transform scale-95 opacity-0"
													enterTo="transform scale-100 opacity-100"
													leave="transition duration-75 ease-out"
													leaveFrom="transform scale-100 opacity-100"
													leaveTo="transform scale-95 opacity-0"
												>
													<Disclosure.Panel static as="ul" className="space-y-4 mt-4">
														<li>
															<NavLink
																to={`/${routeConstant.ROUTE_NAME_USER}`}
																className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
																classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
																classNameNotActive="hover:bg-gray-900 hover:text-white text-gray-400"
															>
																<ListIcon className="w-6 h-6" />
																<span className="ml-4">List</span>
															</NavLink>
														</li>
														<li>
															<NavLink
																to={`/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_NEW}`}
																className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
																classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
																classNameNotActive="hover:bg-gray-900 hover:text-white text-gray-400"
															>
																<PlusCircleIcon className="w-6 h-6" />
																<span className="ml-4">New</span>
															</NavLink>
														</li>
													</Disclosure.Panel>
												</Transition>
											</Fragment>
										)}
									</Disclosure>
								)}
								<Disclosure as="li" defaultOpen={[`/${routeConstant.ROUTE_NAME_SETTING}`].includes(location.pathname)}>
									{({ open }) => (
										<Fragment>
											<Disclosure.Button
												className={classNames(
													'inline-flex items-center w-full px-4 py-2 text-base rounded-lg focus:shadow-outline hover:bg-gray-900 hover:text-white',
													[`/${routeConstant.ROUTE_NAME_SETTING}`].includes(location.pathname) ? 'bg-gray-900 text-white' : 'text-gray-400'
												)}
											>
												<EllipsisHorizontalIcon className="w-6 h-6" />
												<span className="ml-4">More</span>
												<ChevronLeftIcon
													className={classNames('w-6 h-6 ml-auto', {
														'transform -rotate-90': open
													})}
												/>
											</Disclosure.Button>
											<Transition
												as={Fragment}
												enter="transition duration-100 ease-out"
												enterFrom="transform scale-95 opacity-0"
												enterTo="transform scale-100 opacity-100"
												leave="transition duration-75 ease-out"
												leaveFrom="transform scale-100 opacity-100"
												leaveTo="transform scale-95 opacity-0"
											>
												<Disclosure.Panel static as="ul" className="space-y-4 mt-4">
													<li>
														<NavLink
															to={`/${routeConstant.ROUTE_NAME_SETTING}`}
															className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
															classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
															classNameNotActive="hover:bg-gray-900 hover:text-white text-gray-400"
														>
															<CogIcon className="w-6 h-6" />
															<span className="ml-4">Settings</span>
														</NavLink>
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

export default Sidebar;