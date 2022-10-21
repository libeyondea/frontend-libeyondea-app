import { BarsIcon } from 'src/components/Icon';
import Image from 'src/components/Image';
import Link from 'src/components/Link';
import * as cookiesConstant from 'src/constants/cookies';
import * as routeConstant from 'src/constants/route';
import authService from 'src/services/authService';
import { useDispatch, useSelector } from 'src/store';
import { authCurrentDataTokenRequestAction, authCurrentDataUserRequestAction } from 'src/store/auth/actions';
import { selectAuthCurrent } from 'src/store/auth/selectors';
import cookies from 'src/utils/cookies';
import toastify from 'src/utils/toastify';

const Navbar = () => {
	const dispatch = useDispatch();
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
		<nav className="navbar bg-base-100 w-full shadow-md sticky top-0 z-30 h-16 bg-opacity-90 backdrop-blur text-base-content">
			<div className="flex-1">
				<label htmlFor="my-drawer" className="btn btn-square btn-ghost lg:hidden">
					<BarsIcon className="inline-block w-5 h-5 stroke-current" />
				</label>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<div className="w-9 rounded-full">
							<Image src={authCurrent.data.user?.avatar} alt={authCurrent.data.user?.user_name} />
						</div>
					</label>
					<ul tabIndex={0} className="menu menu-compact dropdown-content mt-4 p-2 shadow bg-base-100 rounded-box w-52">
						<li>
							<Link to={`/${routeConstant.ROUTE_NAME_PROFILE}`}>Profile</Link>
						</li>
						<li>
							<Link to={`/${routeConstant.ROUTE_NAME_SETTING}`}>Settings</Link>
						</li>
						<li>
							<button type="button" onClick={onClickSignOut}>
								Sign out
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
