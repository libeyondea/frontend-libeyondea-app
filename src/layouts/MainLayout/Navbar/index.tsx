import Avatar from 'src/components/Avatar';
import Dropdown from 'src/components/Dropdown';
import { BarsIcon } from 'src/components/Icon';
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
				<Dropdown align="end">
					<Dropdown.Toggle color="ghost" shape="circle">
						<Avatar src={authCurrent.data.user?.avatar} shape="circle" size="2.25rem" />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item to={`/${routeConstant.ROUTE_NAME_PROFILE}`}>Profile</Dropdown.Item>
						<Dropdown.Item to={`/${routeConstant.ROUTE_NAME_SETTING}`}>Settings</Dropdown.Item>
						<Dropdown.Item>
							<button type="button" onClick={onClickSignOut}>
								Sign out
							</button>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</nav>
	);
};

export default Navbar;
