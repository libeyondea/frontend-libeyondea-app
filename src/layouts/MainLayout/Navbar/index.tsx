import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';

import Avatar from 'src/components/Avatar';
import { BarsIcon } from 'src/components/Icon';
import Link from 'src/components/Link';
import * as cookiesConstant from 'src/constants/cookies';
import * as routeConstant from 'src/constants/route';
import authService from 'src/services/authService';
import { useDispatch, useSelector } from 'src/store';
import { appSidebarRequestAction } from 'src/store/app/actions';
import { selectAppSidebar } from 'src/store/app/selectors';
import { authCurrentDataTokenRequestAction, authCurrentDataUserRequestAction } from 'src/store/auth/actions';
import { selectAuthCurrent } from 'src/store/auth/selectors';
import cookies from 'src/utils/cookies';
import toastify from 'src/utils/toastify';

const Navbar = () => {
	const dispatch = useDispatch();
	const appSidebar = useSelector(selectAppSidebar);
	const authCurrent = useSelector(selectAuthCurrent);

	const onClickSignOut = () => {
		if (authCurrent.data.token) {
			authService
				.signOut(authCurrent.data.token)
				.then(() => {})
				.catch(() => {})
				.finally(() => {});
		}
		cookies.remove(cookiesConstant.COOKIES_AUTH_TOKEN);
		dispatch(authCurrentDataUserRequestAction(null));
		dispatch(authCurrentDataTokenRequestAction(null));
		toastify.success('Signed out successfully.');
	};

	return (
		<nav className={classNames('fixed inset-x-0 top-0 z-20 bg-white shadow-lg transition-all duration-500 ease-in-out', appSidebar ? 'lg:ml-64' : 'ml-0')}>
			<div className="w-full p-2">
				<div className="flex items-center">
					<div className="mr-auto flex items-center">
						<button
							className="inline-flex items-center justify-center p-2 text-gray-500 outline-none"
							onClick={() => dispatch(appSidebarRequestAction(!appSidebar))}
						>
							<BarsIcon className="h-6 w-6" />
						</button>
						<div className="ml-2 flex items-baseline space-x-4">
							<Link className="py-2 text-sm font-medium text-gray-700 hover:text-gray-900" to="/">
								Home
							</Link>
						</div>
					</div>
					<Menu as="div" className="relative inline-block">
						<Menu.Button className="flex justify-center outline-none">
							<Avatar className="h-10 w-10" src={authCurrent.data.user?.avatar} alt={authCurrent.data.user?.user_name} />
						</Menu.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 mt-4 w-56 origin-top-right rounded-md bg-white p-2 shadow-lg">
								<Menu.Item>
									{({ active }) => (
										<Link
											to={`/${routeConstant.ROUTE_NAME_PROFILE}`}
											className={classNames('text-md block rounded-md px-4 py-2', active ? 'bg-gray-300 text-gray-700' : 'text-gray-900')}
										>
											<span>Profile</span>
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<Link
											to={`/${routeConstant.ROUTE_NAME_SETTING}`}
											className={classNames('text-md block rounded-md px-4 py-2', active ? 'bg-gray-300 text-gray-700' : 'text-gray-900')}
										>
											<span>Settings</span>
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											className={classNames(
												'text-md block w-full rounded-md px-4 py-2 text-left',
												active ? 'bg-gray-300 text-gray-700' : 'text-gray-900'
											)}
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
		</nav>
	);
};

export default Navbar;
