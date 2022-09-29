import { useLocation, useNavigate } from 'react-router-dom';

import ImageComponent from 'src/components/Image/components';
import config from 'src/config';
import * as cookiesConstant from 'src/constants/cookies';
import * as routeConstant from 'src/constants/route';
import cookies from 'src/helpers/cookies';
import errorHandler from 'src/helpers/errorHandler';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useOnceEffect from 'src/hooks/useOnceEffect';
import Logo from 'src/images/logo.png';
import authService from 'src/services/auth';
import { appInitializedRequestAction } from 'src/store/app/actions';
import { selectAppInitialized } from 'src/store/app/selectors';
import { authCurrentDataTokenRequestAction, authCurrentDataUserRequestAction } from 'src/store/auth/actions';
import { selectIsAuth } from 'src/store/auth/selectors';
import { LocationState } from 'src/types/router';

type Props = {
	children: JSX.Element;
};

const SplashComponent = ({ children }: Props) => {
	const navigate = useNavigate();
	const location = useLocation() as LocationState;
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	const appInitialized = useAppSelector(selectAppInitialized);

	useOnceEffect(() => {
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
					dispatch(authCurrentDataUserRequestAction(response.data.data));
					dispatch(authCurrentDataTokenRequestAction(token));
					dispatch(appInitializedRequestAction(true));
					/* if (initialUrl) {
						navigate(initialUrl, {
							replace: true
						});
					} else {
						navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`, {
							replace: true
						});
					} */
				})
				.catch(
					errorHandler((error) => {
						if (error.type === 'unauthorized-error') {
							navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`, {
								replace: true
							});
						}
					})
				);
		} else {
			dispatch(authCurrentDataUserRequestAction(null));
			dispatch(authCurrentDataTokenRequestAction(null));
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

	if (!appInitialized) {
		return (
			<div className="flex h-screen">
				<ImageComponent className="m-auto animate-spin rounded-full h-32 w-32" src={Logo} alt={config.APP_NAME} />
			</div>
		);
	}

	return children;
};

export default SplashComponent;
