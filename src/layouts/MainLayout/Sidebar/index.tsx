import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import _ from 'lodash';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import Logo from 'src/assets/images/logo.png';
import { ChevronLeftIcon, CogIcon, ListIcon, PlusCircleIcon, TachometerIcon, UserIcon } from 'src/components/Icon';
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
					'fixed inset-y-0 left-0 z-30 flex max-w-full flex-shrink-0 transition-all duration-500 ease-in-out',
					appSidebar ? '-ml-64 lg:ml-0' : 'ml-0 lg:-ml-64'
				)}
			>
				<div className="flex w-64 flex-col bg-gray-800">
					<div className="fixed z-50 flex w-64 flex-shrink-0 flex-col bg-gray-800 px-8 py-2">
						<div className="w-full">
							<Link to="/" className="flex items-center text-left focus:outline-none">
								<Image className="h-10 w-10 rounded-full" src={Logo} alt={config.APP_NAME} />
								<h2 className="ml-2 cursor-pointer text-lg font-bold tracking-tighter text-white">{config.APP_NAME}</h2>
							</Link>
							{/* <button
								className="-mr-1 inline-flex items-center rounded-md p-1 text-gray-400 hover:bg-gray-500 hover:text-white lg:hidden"
								onClick={() => dispatch(appSidebarRequestAction(true))}
							>
								<TimesIcon className="h-6 w-6" />
							</button> */}
						</div>
					</div>
					<div className="mt-14 flex flex-col overflow-y-auto p-4">
						<nav className="flex-1 bg-gray-800">
							<ul className="space-y-2">
								{_.includes([userConstant.USER_ROLE_OWNER], authCurrent.data.user?.role.name) && (
									<li>
										<NavLink
											to={`/${routeConstant.ROUTE_NAME_DASHBOARD}`}
											className="focus:shadow-outline inline-flex w-full items-center rounded-lg px-4 py-2 text-base"
											classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
											classNameDeactive="hover:bg-gray-900 hover:text-white text-gray-400"
										>
											<TachometerIcon className="h-6 w-6" />
											<span className="ml-4">Dashboard</span>
										</NavLink>
									</li>
								)}
								{_.includes([userConstant.USER_ROLE_OWNER], authCurrent.data.user?.role.name) && (
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
														'focus:shadow-outline inline-flex w-full items-center rounded-lg px-4 py-2 text-base hover:bg-gray-900 hover:text-white',
														[
															`/${routeConstant.ROUTE_NAME_USER}`,
															`/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_NEW}`
														].includes(location.pathname)
															? 'bg-gray-900 text-white'
															: 'text-gray-400'
													)}
												>
													<UserIcon className="h-6 w-6" />
													<span className="ml-4">Users</span>
													<ChevronLeftIcon
														className={classNames('ml-auto h-6 w-6', {
															'-rotate-90 transform': open
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
													<Disclosure.Panel static as="ul" className="mt-2 space-y-2">
														<li>
															<NavLink
																to={`/${routeConstant.ROUTE_NAME_USER}`}
																className="focus:shadow-outline inline-flex w-full items-center rounded-lg py-2 pl-8 pr-4 text-base"
																classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
																classNameDeactive="hover:bg-gray-900 hover:text-white text-gray-400"
															>
																<ListIcon className="h-6 w-6" />
																<span className="ml-4">List</span>
															</NavLink>
														</li>
														<li>
															<NavLink
																to={`/${routeConstant.ROUTE_NAME_USER}/${routeConstant.ROUTE_NAME_USER_NEW}`}
																className="focus:shadow-outline inline-flex w-full items-center rounded-lg py-2 pl-8 pr-4 text-base"
																classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
																classNameDeactive="hover:bg-gray-900 hover:text-white text-gray-400"
															>
																<PlusCircleIcon className="h-6 w-6" />
																<span className="ml-4">New</span>
															</NavLink>
														</li>
													</Disclosure.Panel>
												</Transition>
											</Fragment>
										)}
									</Disclosure>
								)}
								<li>
									<NavLink
										to={`/${routeConstant.ROUTE_NAME_SETTING}`}
										className="focus:shadow-outline inline-flex w-full items-center rounded-lg px-4 py-2 text-base"
										classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
										classNameDeactive="hover:bg-gray-900 hover:text-white text-gray-400"
									>
										<CogIcon className="h-6 w-6" />
										<span className="ml-4">Settings</span>
									</NavLink>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
