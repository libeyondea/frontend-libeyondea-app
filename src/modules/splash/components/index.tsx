import { useLocation, useNavigate } from 'react-router-dom';

import ImageComponent from 'src/components/Image/components';
import config from 'src/config';
import * as cookiesConstant from 'src/constants/cookies';
import * as routeConstant from 'src/constants/route';
import cookies from 'src/helpers/cookies';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useOnceEffect from 'src/hooks/useOnceEffect';
import Logo from 'src/images/logo.png';
import authService from 'src/services/authService';
import store from 'src/store';
import { appInitializedRequestAction } from 'src/store/app/actions';
import { authCurrentDataRequestAction, authCurrentTokenRequestAction } from 'src/store/auth/actions';
import { selectIsAuth } from 'src/store/auth/selectors';
import { LocationState } from 'src/types/router';

const SplashComponent = () => {
	const navigate = useNavigate();
	const location = useLocation() as LocationState;
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);

	useOnceEffect(() => {
		dispatch(appInitializedRequestAction(true));
		const token = cookies.get(cookiesConstant.COOKIES_KEY_TOKEN);
		const initialUrl = location.state?.from?.pathname;

		if (isAuth) {
			if (initialUrl) {
				navigate(initialUrl, {
					replace: true
				});
			} else {
				navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`, {
					replace: true
				});
			}
		} else if (token) {
			authService
				.me(token)
				.then((response) => {
					dispatch(authCurrentDataRequestAction(response.data.data));
					dispatch(authCurrentTokenRequestAction(token));
					if (initialUrl) {
						navigate(initialUrl, {
							replace: true
						});
					} else {
						navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`, {
							replace: true
						});
					}
				})
				.catch(() => {
					cookies.remove(cookiesConstant.COOKIES_KEY_TOKEN);
					store.dispatch(authCurrentDataRequestAction(null));
					store.dispatch(authCurrentTokenRequestAction(null));
					navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`, {
						replace: true
					});
				});
		} else {
			dispatch(authCurrentDataRequestAction(null));
			dispatch(authCurrentTokenRequestAction(null));
			if (initialUrl) {
				navigate(initialUrl, {
					replace: true
				});
			} else {
				navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`, {
					replace: true
				});
			}
		}
	});

	return (
		<div className="flex h-screen">
			<ImageComponent className="m-auto animate-spin rounded-full h-32 w-32" src={Logo} alt={config.APP_NAME} />
		</div>
	);
};

export default SplashComponent;
