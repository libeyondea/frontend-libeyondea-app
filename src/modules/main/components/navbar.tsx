import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import ImageComponent from 'src/components/Image/components';
import LinkComponent from 'src/components/Link/components';
import * as cookiesConstant from 'src/constants/cookies';
import * as routeConstant from 'src/constants/route';
import { removeCookie } from 'src/helpers/cookies';
import toastify from 'src/helpers/toastify';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import authService from 'src/services/authService';
import { appSidebarRequestAction } from 'src/store/app/actions';
import { selectAppSidebar } from 'src/store/app/selectors';
import { authCurrentDataRequestAction, authCurrentTokenRequestAction } from 'src/store/auth/actions';
import { selectAuthCurrent } from 'src/store/auth/selectors';

type Props = {};

const NavbarComponent: React.FC<Props> = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const appSidebar = useAppSelector(selectAppSidebar);
	const authCurrent = useAppSelector(selectAuthCurrent);

	const onClickSignOut = () => {
		if (authCurrent.token) {
			authService
				.signOut(authCurrent.token)
				.then(() => {})
				.catch(() => {})
				.finally(() => {});
		}
		removeCookie(cookiesConstant.COOKIES_KEY_TOKEN);
		dispatch(authCurrentDataRequestAction(null));
		dispatch(authCurrentTokenRequestAction(null));
		toastify.success('Signed out successfully');
		navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`);
	};

	return (
		<nav
			className={classNames('bg-white shadow-lg z-20 inset-x-0 top-0 transition-all ease-in-out duration-500', appSidebar ? 'lg:ml-64' : 'ml-0', {
				fixed: authCurrent.data?.setting.navbar === 'fixed',
				static: authCurrent.data?.setting.navbar === 'static'
			})}
		>
			<div className="xl:container mx-auto px-4">
				<div className="flex items-center py-2">
					<div className="flex items-center mr-auto">
						<button
							className="text-gray-800 inline-flex items-center justify-center rounded-md focus:outline-none"
							onClick={() => dispatch(appSidebarRequestAction(!appSidebar))}
						>
							<AiOutlineMenu className="h-6 w-6" />
						</button>
						<div className="block">
							<div className="ml-4 flex items-baseline space-x-4">
								<LinkComponent className="text-gray-800 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium" href="/">
									Home
								</LinkComponent>
							</div>
						</div>
					</div>
					<div className="block">
						<div className="flex items-center">
							<Menu as="div" className="relative inline-block text-left">
								<div>
									<Menu.Button className="flex items-center justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none">
										<ImageComponent className="rounded-full h-8 w-8" src={authCurrent.data?.avatar_url} alt={authCurrent.data?.user_name} />
									</Menu.Button>
								</div>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
										<Menu.Item>
											{({ active }) => (
												<LinkComponent
													href={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_PROFILE}`}
													className={classNames('block px-4 py-2 rounded-md text-md', {
														'bg-gray-300 text-gray-700': active,
														'text-gray-900': !active
													})}
												>
													<span>Profile</span>
												</LinkComponent>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<LinkComponent
													href={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_SETTING}`}
													className={classNames('block px-4 py-2 rounded-md text-md', {
														'bg-gray-300 text-gray-700': active,
														'text-gray-900': !active
													})}
												>
													<span>Settings</span>
												</LinkComponent>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<button
													type="button"
													className={classNames('block px-4 py-2 rounded-md text-left text-md w-full', {
														'bg-gray-300 text-gray-700': active,
														'text-gray-900': !active
													})}
													onClick={onClickSignOut}
												>
													<span>Sign out</span>
												</button>
											)}
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarComponent;
