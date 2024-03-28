import Avatar from 'src/components/Avatar';
import Button from 'src/components/Button';
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
		<nav className="navbar sticky top-0 z-30 h-16 w-full bg-base-100 bg-opacity-90 text-base-content shadow-md backdrop-blur">
			<div className="flex-1">
				<label htmlFor="my-drawer" className="btn btn-square btn-ghost lg:hidden">
					<BarsIcon className="inline-block h-5 w-5 stroke-current" />
				</label>
			</div>
			<div className="flex-none">
				<Dropdown align="end">
					<Dropdown.Toggle>
						<Button className="px-2" color="ghost">
							<Avatar src={authCurrent.data.user?.avatar} size="2.25rem" />
						</Button>
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
