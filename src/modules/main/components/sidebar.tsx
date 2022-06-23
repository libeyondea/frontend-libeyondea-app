import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import {
	ChevronLeftIconComponent,
	CogIconComponent,
	EllipsisHorizontalIconComponent,
	ListIconComponent,
	PlusCircleIconComponent,
	TachometerIconComponent,
	TimesIconComponent,
	UserIconComponent
} from 'src/components/Icon/components';
import ImageComponent from 'src/components/Image/components';
import LinkComponent from 'src/components/Link/components';
import NavLinkComponent from 'src/components/NavLink/components';
import config from 'src/config';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import Logo from 'src/images/logo.png';
import { appSidebarRequestAction } from 'src/store/app/actions';
import { selectAppSidebar } from 'src/store/app/selectors';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const SidebarComponent = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const appSidebar = useAppSelector(selectAppSidebar);
	const authCurrent = useAppSelector(selectAuthCurrent);

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
							<LinkComponent to="/" className="flex items-center text-left focus:outline-none">
								<ImageComponent className="rounded-full h-8 w-8" src={Logo} alt={config.APP_NAME} />
								<h2 className="text-lg text-white font-bold tracking-tighter cursor-pointer ml-3">{config.APP_NAME}</h2>
							</LinkComponent>
							<button
								className="inline-flex items-center text-gray-400 hover:bg-gray-500 hover:text-white p-1 rounded-md lg:hidden -mr-1"
								onClick={() => dispatch(appSidebarRequestAction(true))}
							>
								<TimesIconComponent className="h-6 w-6" />
							</button>
						</div>
					</div>
					<div className="flex flex-col overflow-y-auto p-4 mt-14">
						<nav className="flex-1 bg-gray-800">
							<ul className="space-y-3">
								<li>
									<NavLinkComponent
										to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`}
										className="inline-flex items-center w-full px-4 py-2 text-base rounded-lg focus:shadow-outline"
										classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
										classNameNotActive="hover:bg-gray-900 hover:text-white text-gray-400"
									>
										<TachometerIconComponent className="w-6 h-6" />
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
													<UserIconComponent className="w-6 h-6" />
													<span className="ml-4">Users</span>
													<ChevronLeftIconComponent
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
															<NavLinkComponent
																to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`}
																className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
																classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
																classNameNotActive="hover:bg-gray-900 hover:text-white text-gray-400"
															>
																<ListIconComponent className="w-6 h-6" />
																<span className="ml-4">List</span>
															</NavLinkComponent>
														</li>
														<li>
															<NavLinkComponent
																to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}/${routeConstant.ROUTE_NAME_MAIN_USER_NEW}`}
																className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
																classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
																classNameNotActive="hover:bg-gray-900 hover:text-white text-gray-400"
															>
																<PlusCircleIconComponent className="w-6 h-6" />
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
												<EllipsisHorizontalIconComponent className="w-6 h-6" />
												<span className="ml-4">More</span>
												<ChevronLeftIconComponent
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
														<NavLinkComponent
															to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_SETTING}`}
															className="inline-flex items-center w-full pl-8 pr-4 py-2 text-base rounded-lg focus:shadow-outline"
															classNameActive="bg-gray-500 hover:bg-gray-500 font-bold text-white"
															classNameNotActive="hover:bg-gray-900 hover:text-white text-gray-400"
														>
															<CogIconComponent className="w-6 h-6" />
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
